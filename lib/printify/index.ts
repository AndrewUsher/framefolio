import Printify, { Product } from 'printify-sdk-js'

const accessToken = process.env.PRINTIFY_API_TOKEN as string
const shopId = process.env.PRINTIFY_SHOP_ID as string

if (!accessToken) {
  console.warn('PRINTIFY_API_TOKEN environment variable is not set')
}

if (!shopId) {
  console.warn('PRINTIFY_SHOP_ID environment variable is not set')
}

// Create a singleton instance of the Printify client
const printifyClient = new Printify({
  accessToken,
  shopId
})

/**
 * Fetches all products from the Printify store
 */
export async function listAllProducts(): Promise<Product[]> {
  try {
    // Get all products from the shop
    const shops = await printifyClient.products.list()
    return shops.data
  } catch (error) {
    console.error('Error fetching products from Printify:', error)
    throw error
  }
}

/**
 * Get a specific product by ID
 *
 * @param {string} productId - The ID of the product to retrieve
 * @returns {Promise<any>} A promise that resolves to the product data
 */
export async function getProduct(productId: string) {
  try {
    const product = await printifyClient.products.getOne(productId)
    return product
  } catch (error) {
    console.error(`Error fetching product ${productId} from Printify:`, error)
    throw error
  }
}

// Export the client for advanced usage if needed
export { printifyClient }
