import PDFDocument from 'pdfkit'

/**
 * 📄 TEMPLATE DE FACTURE (PDF)
 * Ce fichier a été conçu pour être facilement modifiable.
 * Il est partagé (ou identique) entre le backend (pour l'envoi d'emails)
 * et le storefront (pour le téléchargement potentiel de factures par l'utilisateur).
 */

export async function generateInvoicePdf(
  order: any,
  shippingAddress: any,
  dictionary: any
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 })
      const buffers: Buffer[] = []

      doc.on('data', buffers.push.bind(buffers))
      doc.on('end', () => resolve(Buffer.concat(buffers)))
      doc.on('error', reject)

      // ========================================== //
      //            👇 VOS DONNÉES ICI 👇           //
      // ========================================== //

      const COMPANY_INFO = {
        name: 'TeraPrintStudio',
        addressLine1: '1 BIS Rue du maréchal Joffre',
        addressLine2: '24400 Mussidan, France',
        email: 'theodumontet.pro@gmail.com',
        website: 'www.teraprintstudio.com',
        phone: '+33 6 51 23 12 70',
        siret: 'SIRET: 940 684 228',
        legalNotes: 'Dispensé d’immatriculation au registre du commerce et des sociétés (RCS) et au répertoire des métiers (RM) - TVA non applicable, art. 293 B du CGI.'
      }

      const INVOICE_LABELS = dictionary.invoice || {
        title: 'FACTURE',
        orderRef: 'Réf. Commande :',
        date: 'Date de facturation :',
        billTo: 'Facturé et Livré à :',
        tableHeaderDesc: 'Description',
        tableHeaderPrice: 'Prix Unité',
        tableHeaderQty: 'Qté',
        tableHeaderTotal: 'Total',
        subtotal: 'Sous-total',
        shipping: 'Livraison',
        grandTotal: 'TOTAL TTC',
        footerThankYou: 'Merci pour votre confiance et votre achat !',
        footerContact: 'Pour toute question concernant cette facture, veuillez nous contacter :'
      }

      // ========================================== //
      //            👆 VOS DONNÉES ICI 👆           //
      // ========================================== //

      // --- EN-TÊTE DE LA FACTURE ---
      const fs = require('fs')
      const path = require('path')
      const logoPath = path.join(process.cwd(), 'public', 'logo.jpg')

      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 440, 40, { fit: [100, 50], align: 'right' })
      }

      doc.fontSize(28)
        .font('Helvetica-Bold')
        .text(INVOICE_LABELS.title, 50, 50)

      doc.fontSize(10)
        .font('Helvetica-Bold')
        .text(COMPANY_INFO.name, 50, 90)
        .font('Helvetica')
        .text(COMPANY_INFO.addressLine1, 50, 105)
        .text(COMPANY_INFO.addressLine2, 50, 120)
        .text(`Email : ${COMPANY_INFO.email}`, 50, 135)
        .text(`Tel : ${COMPANY_INFO.phone}`, 50, 150)
        .text(COMPANY_INFO.siret, 50, 165)
        .text(COMPANY_INFO.vatNumber, 50, 180)

      const displayId = order.display_id || order.id || 'N/A'
      const creationDate = order.created_at ? new Date(order.created_at).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR')

      doc.fontSize(10)
        .font('Helvetica-Bold')
        .text(INVOICE_LABELS.orderRef, 350, 90)
        .font('Helvetica')
        .text(displayId, 450, 90)

        .font('Helvetica-Bold')
        .text(INVOICE_LABELS.date, 350, 105)
        .font('Helvetica')
        .text(creationDate, 450, 105)

      doc.moveDown(3)

      // --- ADRESSE DU CLIENT ---
      const addressTop = 220
      doc.fontSize(12)
        .font('Helvetica-Bold')
        .text(INVOICE_LABELS.billTo, 50, addressTop)

      doc.fontSize(10)
        .font('Helvetica')
        .text(`${shippingAddress?.first_name || ''} ${shippingAddress?.last_name || ''}`, 50, addressTop + 20)
        .text(shippingAddress?.address_1 || 'Adresse non renseignée', 50, addressTop + 35)

      let nextLineY = addressTop + 50
      if (shippingAddress?.address_2) {
        doc.text(shippingAddress?.address_2, 50, nextLineY)
        nextLineY += 15
      }

      const cityLine = `${shippingAddress?.postal_code || ''} ${shippingAddress?.city || ''}`.trim()
      doc.text(cityLine, 50, nextLineY)
      nextLineY += 15
      doc.text((shippingAddress?.country_code || '').toUpperCase(), 50, nextLineY)

      // --- TABLEAU DES ARTICLES ---
      const tableTop = 330

      doc.font('Helvetica-Bold')
      generateTableRow(doc, tableTop, INVOICE_LABELS.tableHeaderDesc, INVOICE_LABELS.tableHeaderPrice, INVOICE_LABELS.tableHeaderQty, INVOICE_LABELS.tableHeaderTotal)
      generateHr(doc, tableTop + 20)
      doc.font('Helvetica')

      let currentY = tableTop + 30
      const items = order.items || []

      for (let i = 0; i < items.length; i++) {
        const item = items[i]

        const unitPriceNum = item.unit_price || 0
        const totalLineNum = unitPriceNum * (item.quantity || 1)

        const currency = (order.currency_code || 'EUR').toUpperCase()
        const unitPriceStr = `${unitPriceNum} ${currency}`
        const totalLineStr = `${totalLineNum} ${currency}`

        generateTableRow(
          doc,
          currentY,
          item.product_title || item.title || 'Article Inconnu',
          unitPriceStr,
          (item.quantity || 1).toString(),
          totalLineStr
        )

        generateHr(doc, currentY + 20)
        currentY += 30

        if (currentY > 700) {
          doc.addPage()
          currentY = 50
        }
      }

      // --- RÉSUMÉ DU TOTAL ---
      let totalSectionY = currentY + 20

      // Subtotal Calculation
      const itemTotalNum = order.summary?.raw_current_item_total?.value || order.items?.reduce((acc: number, item: any) => acc + ((item.unit_price || 0) * (item.quantity || 1)), 0) || 0
      const itemTotalStr = `${itemTotalNum} ${(order.currency_code || 'EUR').toUpperCase()}`

      doc.font('Helvetica-Bold')
      doc.fontSize(10)
      doc.text(INVOICE_LABELS.subtotal, doc.page.width - 250, totalSectionY, { width: 100, align: 'right' })
      doc.font('Helvetica')
      doc.text(itemTotalStr, doc.page.width - 140, totalSectionY, { width: 90, align: 'right' })

      totalSectionY += 20

      // Shipping Calculation
      const shippingTotalNum = order.summary?.raw_current_shipping_total?.value || ((order.shipping_methods || []).reduce((acc: number, method: any) => acc + (method.amount || 0), 0)) || 0
      const shippingTotalStr = `${shippingTotalNum} ${(order.currency_code || 'EUR').toUpperCase()}`

      doc.font('Helvetica-Bold')
      doc.text(INVOICE_LABELS.shipping, doc.page.width - 250, totalSectionY, { width: 100, align: 'right' })
      doc.font('Helvetica')
      doc.text(shippingTotalStr, doc.page.width - 140, totalSectionY, { width: 90, align: 'right' })

      totalSectionY += 25
      generateHr(doc, totalSectionY - 5)

      // Grand Total Calculation
      const orderTotalNum = order.summary?.raw_current_order_total?.value || (itemTotalNum + shippingTotalNum)
      const orderTotalStr = `${orderTotalNum} ${(order.currency_code || 'EUR').toUpperCase()}`

      doc.font('Helvetica-Bold')
      doc.fontSize(12)
      doc.text(INVOICE_LABELS.grandTotal, doc.page.width - 250, totalSectionY, { width: 100, align: 'right' })
      doc.text(orderTotalStr, doc.page.width - 140, totalSectionY, { width: 90, align: 'right' })
      doc.font('Helvetica')

      // --- PIED DE PAGE ---
      const bottomY = doc.page.height - 120 // Remonté pour éviter des pages blanches non sollicitées

      generateHr(doc, bottomY - 10)

      doc.fontSize(9)
        .text(INVOICE_LABELS.footerThankYou, 50, bottomY + 5, { align: 'center', width: doc.page.width - 100 })
        .text(`${INVOICE_LABELS.footerContact} ${COMPANY_INFO.email}`, 50, bottomY + 20, { align: 'center', width: doc.page.width - 100 })
        .font('Helvetica-Oblique')
        .text(COMPANY_INFO.legalNotes, 50, bottomY + 35, { align: 'center', width: doc.page.width - 100, color: 'gray' })

      doc.end()
    } catch (err) {
      reject(err)
    }
  })
}

function generateTableRow(
  doc: PDFKit.PDFDocument,
  y: number,
  item: string,
  unitCost: string,
  quantity: string,
  lineTotal: string
) {
  doc.fontSize(10)
    .text(item, 50, y, { width: 220 })
    .text(unitCost, 280, y, { width: 90, align: 'right' })
    .text(quantity, 390, y, { width: 40, align: 'right' })
    .text(lineTotal, 0, y, { align: 'right', width: doc.page.width - 50 })
}

function generateTableRowTotal(
  doc: PDFKit.PDFDocument,
  y: number,
  lineTotal: string
) {
  doc.fontSize(12)
    .text(lineTotal, 0, y, { align: 'right', width: doc.page.width - 50 })
}

function generateHr(doc: PDFKit.PDFDocument, y: number) {
  doc.strokeColor('#e5e7eb')
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(doc.page.width - 50, y)
    .stroke()
    .fillColor('black')
}
