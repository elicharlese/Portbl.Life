import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  Keypair,
} from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { config } from '@/lib/config';

// Solana connection
export const connection = new Connection(
  config.app.isDev ? config.solana.devnetRpcUrl : config.solana.rpcUrl,
  'confirmed'
);

// Token mint addresses (these would be the actual token mint addresses)
export const TOKEN_MINTS = {
  USDC: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), // USDC on mainnet
  SOL: PublicKey.default, // Native SOL doesn't have a mint address
} as const;

export interface PaymentRequest {
  recipient: string;
  amount: number;
  token: 'SOL' | 'USDC';
  memo?: string;
}

export interface PaymentResult {
  signature: string;
  success: boolean;
  error?: string;
}

/**
 * Generate a payment address for receiving payments
 */
export const generatePaymentAddress = (): string => {
  const keypair = Keypair.generate();
  return keypair.publicKey.toString();
};

/**
 * Verify a Solana transaction
 */
export const verifyTransaction = async (
  signature: string,
  expectedAmount: number,
  recipientAddress: string,
  token: 'SOL' | 'USDC' = 'SOL'
): Promise<boolean> => {
  try {
    const transaction = await connection.getTransaction(signature, {
      commitment: 'confirmed',
    });

    if (!transaction) {
      return false;
    }

    // Verify the transaction was successful
    if (transaction.meta?.err) {
      return false;
    }

    const recipient = new PublicKey(recipientAddress);

    if (token === 'SOL') {
      // For SOL transfers, check the account changes
      const accountKeys = transaction.transaction.message.accountKeys;
      const recipientIndex = accountKeys.findIndex(key => key.equals(recipient));
      
      if (recipientIndex === -1) {
        return false;
      }

      const balanceChange = transaction.meta?.postBalances[recipientIndex]! - 
                           transaction.meta?.preBalances[recipientIndex]!;
      
      return balanceChange >= expectedAmount * LAMPORTS_PER_SOL;
    } else {
      // For token transfers, check token balance changes
      const tokenBalances = transaction.meta?.postTokenBalances || [];
      const preTokenBalances = transaction.meta?.preTokenBalances || [];
      
      // Find the recipient's token account balance change
      for (const postBalance of tokenBalances) {
        if (postBalance.owner === recipientAddress) {
          const preBalance = preTokenBalances.find(
            pre => pre.accountIndex === postBalance.accountIndex
          );
          
          const balanceChange = Number(postBalance.uiTokenAmount.uiAmount) - 
                               Number(preBalance?.uiTokenAmount.uiAmount || 0);
          
          return balanceChange >= expectedAmount;
        }
      }
      
      return false;
    }
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return false;
  }
};

/**
 * Get the balance of a Solana address
 */
export const getBalance = async (address: string, token: 'SOL' | 'USDC' = 'SOL'): Promise<number> => {
  try {
    const publicKey = new PublicKey(address);
    
    if (token === 'SOL') {
      const balance = await connection.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL;
    } else {
      const tokenAccount = await getAssociatedTokenAddress(
        TOKEN_MINTS.USDC,
        publicKey
      );
      
      const balance = await connection.getTokenAccountBalance(tokenAccount);
      return Number(balance.value.uiAmount || 0);
    }
  } catch (error) {
    console.error('Error getting balance:', error);
    return 0;
  }
};

/**
 * Check if a transaction is confirmed
 */
export const isTransactionConfirmed = async (signature: string): Promise<boolean> => {
  try {
    const status = await connection.getSignatureStatus(signature);
    return status.value?.confirmationStatus === 'confirmed' || 
           status.value?.confirmationStatus === 'finalized';
  } catch (error) {
    console.error('Error checking transaction status:', error);
    return false;
  }
};

/**
 * Monitor a transaction for confirmation
 */
export const waitForConfirmation = async (
  signature: string,
  timeout = 60000
): Promise<boolean> => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const confirmed = await isTransactionConfirmed(signature);
    if (confirmed) {
      return true;
    }
    
    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return false;
};
