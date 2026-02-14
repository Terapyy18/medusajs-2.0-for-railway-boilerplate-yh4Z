import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
  checkoutDictionary
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
  checkoutDictionary: any
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div>
      <div className="w-full grid grid-cols-1 gap-y-8">
        <div>
          <Addresses cart={cart} customer={customer} checkoutDictionary={checkoutDictionary} />
        </div>

        <div>
          <Shipping cart={cart} availableShippingMethods={shippingMethods} checkoutDictionary={checkoutDictionary} />
        </div>

        <div>
          <Payment cart={cart} availablePaymentMethods={paymentMethods} checkoutDictionary={checkoutDictionary} />
        </div>

        <div>
          <Review cart={cart} checkoutDictionary={checkoutDictionary} />
        </div>
      </div>
    </div>
  )
}
