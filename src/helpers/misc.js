import React, {useState, useEffect} from 'react';
import {csvParse} from 'd3-dsv';
import get from 'axios';

// méthodes utilisées dans les notebooks
// toflit_client.get_flows(year=1789, best_guess_region_prodxpart='1') 
// Ancienne méthode : flows = client.get_flows(year=1789, source_subset='Poitou_1789')
// même pas l'impression que get_pointcalls soit tant utilisé que ça ...

export const get_toflit_flows_by_csv = ({
    start_year=null, 
    end_year=null, 
    year=null, 
    params=null,
    ...kwargs // https://www.peterbe.com/plog/javascript-destructuring-like-python-kwargs-with-defaults ; 
    // "standard" JavaScript array : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
  }) => {

    /*
    Synopsis : récupère les flux toflit18
    ---
    Paramètres :
    * start_year : <int> # année de début
    * end_year : <int> # année de fin
    * params : <arr> # propriétés à renvoyer
    * [tous les noms de colonne des flux] : <arr/string> valeurs à filtrer dans les flux (peut être une ou plusieurs valeurs)
    */

    let results = []

    // 1. Test de la validité des paramètres
    if (start_year != null && end_year === null) 
        {throw "You must put an end year"} // pas sure pour les accolades
    else if (end_year != null && start_year === null)
        {throw "You must put a start year"}

    if ((start_year != null || end_year != null) && year != null)
        start_year = null
        end_year = null

    
    // 2. gestion de l'asynchrone avec Javascript (useState renvoie un state et un seter qui permet de le modifier)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const URL = `${process.env.PUBLIC_URL}/data/toflit18_all_flows.csv`;

    useEffect(() => {
        // lecture du csv avec tous les flows toflit (get : lancement de la promesse se lance de suite : synchrone, then et catch plus tard)
        get(URL)
        .then(({data: csvString}) => {
            // conversion en js (avec d3-dsv)
            const newData = csvParse(csvString);
            // vega prend qqch comme ça : [{prop1: 'val', pro2: 'val2'}]
            setData(newData);
            console.log(data);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
        })
        }, [filename])
        
    
        if (loading) {
        console.log("data is loading")
        } else if (!data) {
            console.log("error : data cannot be loaded successfully")
        }

        /* dans data on a un dict de type : 
        [   {year: "1789", customs_region: "La Rochelle", partner_simplification: "Iles", export_import: ”Import", product_revolutionempire: "...", ...},
            {year: "1782", customs_region: "Bordeaux", ...},
            {...},
            columns: ["year", "customs_region", ...]

        ]
        */

        for (let row in data){
            let year_row = row['year'].split(".")[0];
            // si  on a bien un start_year et un end_year
            if (start_year != null && end_year != null){
                // s'il existe : je convertis en int mes params start / end_year et je vais regarder si ma date est bien dans le bon span => si non je break (passage ligne suivante)
                if (int(year_row) < int(start_year) || int(year_row) > int(end_year)){
                    continue; // devrait fonctionner en js
                    }
                }
            if (year != null) {
                // s'il existe : je convertis en int mon param year et je vais regarder si ma date correspond bien au year demandé => si non je break (passage ligne suivante) 
                if (int(year_row) != int(year)){
                continue;
                }
            }

            // pour chaque filtre (sauf filtre timespan et filtrage des colomnes) :
            let is_valid = true;

            // key --> 'year', filter_value --> 1789
            for (let filter_value in kwargs) // kwargs semble être indiçable mais pas sur qu'on doive pas le mettre dans un format spécial pas comme python
            // sinon suggestion : function.apply(obj, [args])
            for (let key,filter_value in [param for param in kwargs.items() if param[0] not in ['params']]): 
                row_value = row[key]

                // si la valeur est une liste : on caste en string ses membres
                if isinstance(filter_value, list):
                filter_value = [str(val) for val in filter_value]
                // sinon c'est un tableau à une valeur qu'on caste en string
                else:
                filter_value = [str(filter_value)]
                // à partir de là, filter_value est une liste de strings

                // si la ligne a un attribut qui fait partie des valeurs acceptées par le filtre => on examine les autres filtres 
                if row_value not in filter_value:
                is_valid = False
                break

            // si l'item n'a pas été défiltré, on le formatte avant de l'ajouter au résultat
            if is_valid is True:
                row_formated = {}

                // on ne garde que les colonnes qui nous intéressent dans le résultat 
                if params is not None :
                for column, value in row.items():
                    if column in params:
                    row_formated[column] = value
                else:
                row_formated = row

                results.append(row_formated)
            }        
        return results

    }

    
  

export const get_portic_pointcalls_by_api = ({
    filename,
    spec
  }) => {

  }

  export const get_portic_flows_by_api = ({
    filename,
    spec
  }) => {

  }

