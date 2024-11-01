import React from 'react'
import { View, Text, Image } from '@react-pdf/renderer';
import { ownerCompanyType } from 'sb-schema-and-types';
// ----------------------------------------------------------------------

type headerProps = {
    fixed: boolean,
    godName: string,
    headerRightStrings: string[],
    styles : any,
    ownercompany: ownerCompanyType

}

const HeaderRegular = ({
    fixed,
    godName,
    headerRightStrings,
    styles,
    ownercompany,
}:headerProps) => {    
    // console.log(ownercompany)
    const logoImageLink = ownercompany?.logo_url
return (
    <View fixed={fixed}>
        {/* {godName && 
            <Text style={{textAlign: "center",color:'red',marginTop:3}}>
                {godName}
            </Text>
        } */}
        <View style={[styles.gridContainer, styles.header]}>
            <View style={{alignItems: 'flex-start', flexDirection:'row', justifyContent:"center"}}>   
               { (logoImageLink) &&             
                <Image style={{width:100}} src={logoImageLink} />   
                }              
                <View style={{marginLeft: 14, alignItems: 'flex-start', flexDirection:"column", marginBottom:10}}>
                    <Text style={styles.ogName}>{ownercompany.ownercompany_name}</Text>
                    {ownercompany.headerString && <Text style={{fontSize:10}}>{ownercompany.headerString}</Text>}
                    <Text style={{maxLines:2,maxWidth:250,overflow:"hidden",fontSize:10}}>{ownercompany.address_street_detail||''}</Text>                
                    <Text style={{fontSize:10}}>{ownercompany.address_city} - {ownercompany.address_pincode}</Text>
                    <Text style={{fontSize:10}}>ph:+91-{`${(ownercompany.contacts && ownercompany.contacts[0] && ownercompany.contacts[0].mobile_number )||"xxxxx xxxxx"}`}</Text>
                    <Text style={{fontSize:10}}>
                            {(ownercompany.gst_number)? `GSTIN: ${ownercompany.gst_number}`:""}
                    </Text>
                </View>
            </View>
            <View style={{alignItems: 'flex-end', flexDirection: 'column',height:"100",justifyContent:"flex-end",marginBottom:1,marginRight:2}}>
                {headerRightStrings[0] && headerRightStrings.map((itemString:string, i:number) => (
                    <Text key={i}>{itemString}</Text>
                ))}
            </View>
        </View>
    </View>
)
};

export default HeaderRegular;