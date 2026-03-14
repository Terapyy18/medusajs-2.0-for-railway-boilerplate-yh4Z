import { 
  MedusaRequest, 
  MedusaResponse 
} from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { generateInvoicePdf } from "../../../../../utils/pdf-invoice"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const { id } = req.params
  
  // Resolve the order module
  const orderModuleService = req.scope.resolve(Modules.ORDER)
  
  try {
    // 1. Retrieve the order with its items & summary
    const order = await orderModuleService.retrieveOrder(id, { 
      relations: ['items', 'summary', 'shipping_address'] 
    })

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    // 2. Retrieve shipping address from the internal service (similar to subscriber logic)
    const shippingAddress = await (orderModuleService as any).orderAddressService_.retrieve(
      order.shipping_address?.id
    )

    // 3. Generate PDF buffer
    const pdfBuffer = await generateInvoicePdf(order, shippingAddress)

    // 4. Send the PDF as an attachment
    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", `attachment; filename="Facture_${order.display_id || order.id}.pdf"`)
    res.setHeader("Content-Length", pdfBuffer.length.toString())
    
    // Convert Buffer to stream response
    res.status(200).send(pdfBuffer)
  } catch (error) {
    console.error("Error generating invoice:", error)
    res.status(500).json({ 
      message: "An error occurred while generating the invoice",
      error: error.message 
    })
  }
}
