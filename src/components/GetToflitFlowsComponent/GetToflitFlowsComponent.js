import React, {useState, useEffect} from 'react'; // si je ne vais pas chercher dans mes fichiers c'est que j'importe implicitement un node module
import { getToflitFlowsByCsv } from '../../helpers/misc';

const GetToflitFlowsComponent = ({
}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // aller chercher les données (get : lancement de la promesse se lance de suite : synchrone, then et catch plus tard)
        getToflitFlowsByCsv({
            year: 1789,
            customs_region: "La Rochelle",
            partner: "Portugal"
        })
            .then((newData) => {
                setData(newData);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            })
    }, []) // tableau vide : on ne veut pas relancer la fonction asynchrone car on n'a pas de valeurs qui quand elles changent redeclenchent la fonction


    if (loading) {
        return (
            <div>Chargement des flows Toflit ...</div>
        )
    } else if (!data) {
        return (
            <div>Erreur ...</div>
        )
    }
    return ( 
        <div>
            {data.map((row, index) => <div key={index}>{`${row.year}, ${row.customs_region}, ${row.partner}`}</div>)}
        </div>
    );
}

export default GetToflitFlowsComponent;