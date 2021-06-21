interface EntityModel extends Record<string, string | undefined> {
  barcode: string
  name: string
  type: 'product' | 'service' | 'accessory'
  _id: string
  brand?: string
  model?: string
}

export default EntityModel
