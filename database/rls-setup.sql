-- Row Level Security Setup for Portbl.Life Database
-- This file contains SQL commands to enable RLS and create security policies

-- Enable Row Level Security on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE solana_payments ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id);

-- Addresses table policies
CREATE POLICY "Users can view own addresses" ON addresses
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own addresses" ON addresses
  FOR UPDATE USING (auth.uid()::text = "userId");

CREATE POLICY "Users can delete own addresses" ON addresses
  FOR DELETE USING (auth.uid()::text = "userId");

-- Orders table policies
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- Order items inherit permissions from orders
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items."orderId" 
      AND orders."userId" = auth.uid()::text
    )
  );

-- Reviews table policies
CREATE POLICY "Users can view all reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid()::text = "userId");

CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE USING (auth.uid()::text = "userId");

-- Wishlist table policies
CREATE POLICY "Users can view own wishlist" ON wishlist
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own wishlist items" ON wishlist
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can delete own wishlist items" ON wishlist
  FOR DELETE USING (auth.uid()::text = "userId");

-- Cart table policies
CREATE POLICY "Users can view own cart" ON carts
  FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own cart" ON carts
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own cart" ON carts
  FOR UPDATE USING (auth.uid()::text = "userId");

CREATE POLICY "Users can delete own cart" ON carts
  FOR DELETE USING (auth.uid()::text = "userId");

-- Cart items policies (inherit from cart)
CREATE POLICY "Users can view own cart items" ON cart_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM carts 
      WHERE carts.id = cart_items."cartId" 
      AND carts."userId" = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert own cart items" ON cart_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM carts 
      WHERE carts.id = cart_items."cartId" 
      AND carts."userId" = auth.uid()::text
    )
  );

CREATE POLICY "Users can update own cart items" ON cart_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM carts 
      WHERE carts.id = cart_items."cartId" 
      AND carts."userId" = auth.uid()::text
    )
  );

CREATE POLICY "Users can delete own cart items" ON cart_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM carts 
      WHERE carts.id = cart_items."cartId" 
      AND carts."userId" = auth.uid()::text
    )
  );

-- Solana payments policies (inherit from orders)
CREATE POLICY "Users can view own solana payments" ON solana_payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = solana_payments."orderId" 
      AND orders."userId" = auth.uid()::text
    )
  );

-- Admin policies (for admin users)
-- Users with admin role can view all data
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can update all users" ON users
  FOR UPDATE USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can update all orders" ON orders
  FOR UPDATE USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can view all reviews" ON reviews
  FOR SELECT USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can update all reviews" ON reviews
  FOR UPDATE USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Public read policies for product data
-- Products, collections, and related data should be publicly readable
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view product images" ON product_images
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view product variants" ON product_variants
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view collections" ON collections
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view product collections" ON product_collections
  FOR SELECT USING (true);

-- Admin-only policies for product management
CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can manage product images" ON product_images
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can manage product variants" ON product_variants
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can manage collections" ON collections
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admins can manage product collections" ON product_collections
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Analytics and webhook events should be admin-only
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view webhook events" ON webhook_events
  FOR SELECT USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "System can insert webhook events" ON webhook_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view analytics events" ON analytics_events
  FOR SELECT USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "System can insert analytics events" ON analytics_events
  FOR INSERT WITH CHECK (true);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.jwt() ->> 'role' = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get current user id
CREATE OR REPLACE FUNCTION current_user_id()
RETURNS TEXT AS $$
BEGIN
  RETURN auth.uid()::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Refresh the schema
NOTIFY pgrst, 'reload schema';
