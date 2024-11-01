const primaryKeysproperties = {
    design: ['design_name'],
    sku: ['sku_number'],
    order: ['financial_year', 'ownercompany_short_name', 'voucher_number'],
    orderDesignJt: ['financial_year', 'ownercompany_short_name', 'voucher_number', 'design_name'],
    orderSku: ['financial_year', 'ownercompany_short_name', 'voucher_number', 'sku_number'],
    ownercompany: ['ownercompany_short_name'],
    customer: ['customer_name'],
    agent: ['agent_name'],
    transport: ['transport_name'],
}



function primaryKeyConstrains(
    tableRowDataOriginalObject: any,
    table: 'design' | 'sku' | 'order' | 'orderDesignJt' | 'orderSku' | 'ownercompany' | 'customer' | 'agent' | 'transport'
) {
    const constrains = {}
    
    primaryKeysproperties[table].map((properties: string)=>{
        // @ts-ignore
        constrains[properties] = tableRowDataOriginalObject[properties];
    })

    return constrains;
}

export default primaryKeyConstrains