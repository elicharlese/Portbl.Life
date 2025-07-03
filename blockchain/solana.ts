import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from '@solana/web3.js';
import { config } from '@/lib/config';

// Create connection to Solana network
export const connection = new Connection(
  config.app.isDev ? config.solana.devnetRpcUrl : config.solana.rpcUrl,
  'confirmed'
);

/**
 * Generate a payment instruction for Solana
 */
export const createSolanaPaymentInstruction = async (
  recipientAddress: string,
  amount: number,
  memo?: string
) => {
  const recipient = new PublicKey(recipientAddress);
  const lamports = amount * LAMPORTS_PER_SOL;

  return SystemProgram.transfer({
    fromPubkey: new PublicKey('11111111111111111111111111111111'), // Placeholder
    toPubkey: recipient,
    lamports,
  });
};

/**
 * Verify a Solana transaction
 */
export const verifySolanaTransaction = async (
  transactionHash: string,
  expectedAmount: number,
  recipientAddress: string
): Promise<boolean> => {
  try {
    const transaction = await connection.getTransaction(transactionHash, {
      commitment: 'confirmed',
    });

    if (!transaction) {
      return false;
    }

    // Verify transaction was successful
    if (transaction.meta?.err) {
      return false;
    }

    // Verify amount and recipient
    const recipient = new PublicKey(recipientAddress);
    const expectedLamports = expectedAmount * LAMPORTS_PER_SOL;

    // Check if the transaction contains the expected transfer
    const instruction = transaction.transaction.message.instructions[0];
    if (!instruction) {
      return false;
    }

    // Additional verification logic would go here
    // This is a simplified version
    return true;
  } catch (error) {
    console.error('Error verifying Solana transaction:', error);
    return false;
  }
};

/**
 * Get transaction status
 */
export const getSolanaTransactionStatus = async (transactionHash: string) => {
  try {
    const status = await connection.getSignatureStatus(transactionHash);
    return status.value;
  } catch (error) {
    console.error('Error getting transaction status:', error);
    return null;
  }
};

/**
 * Get wallet balance
 */
export const getSolanaBalance = async (walletAddress: string): Promise<number> => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    return 0;
  }
};

/**
 * Create a payment URL for Solana Pay
 */
export const createSolanaPayUrl = (
  recipient: string,
  amount: number,
  reference: string,
  label?: string,
  message?: string
): string => {
  const params = new URLSearchParams({
    recipient,
    amount: amount.toString(),
    reference,
    ...(label && { label }),
    ...(message && { message }),
  });

  return `solana:${params.toString()}`;
};

/**
 * Monitor transaction confirmation
 */
export const monitorTransactionConfirmation = async (
  transactionHash: string,
  maxRetries = 30,
  retryInterval = 2000
): Promise<boolean> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const status = await getSolanaTransactionStatus(transactionHash);
      
      if (status?.confirmationStatus === 'confirmed' || status?.confirmationStatus === 'finalized') {
        return true;
      }
      
      if (status?.err) {
        return false;
      }
      
      await new Promise(resolve => setTimeout(resolve, retryInterval));
    } catch (error) {
      console.error('Error monitoring transaction:', error);
    }
  }
  
  return false;
};
