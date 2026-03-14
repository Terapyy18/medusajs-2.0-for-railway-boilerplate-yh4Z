import { NextRequest, NextResponse } from "next/server"
import { retrieveOrder } from "@lib/data/orders"
import { generateInvoicePdf } from "@lib/pdf-invoice"
import { getDictionary } from "@lib/dictionary"

// Must run in Node.js runtime for pdfkit
export const runtime = "nodejs"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await retrieveOrder(params.id).catch(() => null)

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 })
    }

    const shippingAddress = order.shipping_address
    const locale = request.nextUrl.searchParams.get("locale")
    const countryCode = locale || (shippingAddress?.country_code === "fr" ? "fr" : "en")
    const dictionary = getDictionary(countryCode)

    const pdfBuffer = await generateInvoicePdf(order, shippingAddress, dictionary)

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Facture_${order.display_id || order.id}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error("Error generating frontend invoice:", error)
    return NextResponse.json(
      { message: "An error occurred while generating the invoice", error: error.message },
      { status: 500 }
    )
  }
}
