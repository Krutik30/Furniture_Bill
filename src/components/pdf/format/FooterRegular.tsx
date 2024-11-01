import { View, Text, Link } from '@react-pdf/renderer';

type footerProps = {
    fixed: boolean,
    styles : any,
    printedBy: string,
    printContinue?: boolean,
    border: boolean
}

const FooterRegular = ({
    fixed,
    styles,
    printedBy,
    printContinue=true,
    border,
}:footerProps) => {
    return(
        <View fixed={fixed} style={{...styles.footer,borderTopWidth: border?1:0, flexDirection: 'row', margin: 65 }} break>
            <View>
                <Text>Printed by: {printedBy}</Text>
                <Text>{new Date().toLocaleString()}</Text>
            </View>
            <View>
                <Text style={{...styles.pageNumber,alignItems:'center'}} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} / ${totalPages}`
                    )} fixed 
                    />
                {printContinue && <Text render={({ pageNumber, totalPages }) => ((pageNumber !== totalPages) ? 'Continued...' : null)} />}
                
            </View>
            <View>
                <Text style={{alignItems:"flex-start"}}> Powered by 
                    <Link src="https://smartbrand.one"><Text> Smart Brand</Text></Link>
                </Text>
            </View>
        </View> 
    )
}

export default FooterRegular