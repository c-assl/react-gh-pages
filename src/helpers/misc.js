import React, { useState, useEffect } from 'react';
import { csvParse } from 'd3-dsv';
import get from 'axios';

// méthodes utilisées dans les notebooks
// toflit_client.get_flows(year=1789, best_guess_region_prodxpart='1') 
// Ancienne méthode : flows = client.get_flows(year=1789, source_subset='Poitou_1789')
// même pas l'impression que get_pointcalls soit tant utilisé que ça ...

// méthode avec callback
// getToflitFlowsByCsv({startYear: 1789}, function(error, result) {
//     // faire des choses avec le résultats
// })

// méthode avec promesse
// getToflitFlowsByCsv({startYear: 1789})
// .then(data => {
//     // préparer les données
//     // setState(data)
// })
// .catch(error => {

// })

// méthode avec async/await
// async function getFlowsByCsv(args) {...}


const _filterData = (data, { startYear, endYear, year, params, ...rest }) => {

    /* dans data on a un dict de type : 
    [   {year: "1789", customs_region: "La Rochelle", partner_simplification: "Iles", export_import: ”Import", product_revolutionempire: "...", ...},
        {year: "1782", customs_region: "Bordeaux", ...},
        {...},
        columns: ["year", "customs_region", ...]

    ]
    */
   let filteredData = data.filter(row => {
        let rowYear = row.year ? +row.year.split(".")[0] : undefined;
        if (startYear && endYear) {
            return rowYear >= +startYear && rowYear <= +endYear;
        // @todo : quand on aura rajouté startYear et endYear pour
        // la récupération de portic il s'agira de déduire ce year des données
        } else if (year && rowYear) {
            return year === +rowYear;
        } else return true;
    })

    filteredData = filteredData.filter(row => {
        // pour chaque filtre (sauf filtre timespan et filtrage des colomnes) :
        let isValid = true;
        // key --> 'year', filter_value --> 1789
        // kwargs obtenu sous forme de dict : --> { year: 1789, customs_region: 'La Rochelle' }

        // kwargs semble être indiçable mais pas sur qu'on doive pas le mettre dans un format spécial pas comme python
        // sinon suggestion : function.apply(obj, [args])

        // ligne originale : je ne sais pas pourquoi on ne veut prendre en compte les filtres que pour les colonnes qui ne sont pas à garder dans le résultats (colonne données dans l'argument 'params' sous forme de liste)
        // for (let key,filter_value in [param for param in kwargs.items() if param[0] not in ['params']]): 
        Object.entries(rest)
        .some(([key, inputFilterValue]) => {
            const rowValue = row[key];
            let filterValue = inputFilterValue;
            // si la valeur est une liste : on caste en string ses membres
            if (Array.isArray(filterValue)) {
                filterValue = filterValue.map(x => x + ''); // caster en string
            }
            // sinon c'est un tableau à une valeur qu'on caste en string
            else {
                filterValue = [filterValue + ''];
            }
            // à partir de là, filter_value est une liste de strings

            // si la ligne a un attribut qui fait partie des valeurs acceptées par le filtre => on examine les autres filtres 
            if (!(rowValue in filterValue)) {
                isValid = false;
                return true;
            }
        })

        return isValid;
    })

    const transformedData = filteredData.map(row => {
        const rowFormated = {};

        // on ne garde que les colonnes qui nous intéressent dans le résultat 
        if (params != null) {
            for (let [column, value] of Object.entries(row)) {
                if (column in params) {
                    rowFormated[column] = value;
                }
            }
        }
        else {
            rowFormated = row;
        }

        return rowFormated;
    })
    return transformedData;
}


export const getToflitFlowsByCsv = ({
    startYear = null,
    endYear = null,
    year = null,
    params = null,
    ...rest // https://www.peterbe.com/plog/javascript-destructuring-like-python-kwargs-with-defaults ; 
    // "standard" JavaScript array : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
}) => {
    // méthode de gestion avec callback
    // let result;
    // trucAsynchrone
    // .then(data => {
    //     callback(null, data);
    // })
    // .catch(error => {
    //     callback(error);
    // })

    // méthode de gestion avec promesse
    // return new Promise((resolve, reject) => {
    //     trucAsynchrone
    //     .then(data => {
    //         // faire des trucs avec data
    //         resolve(data);
    //     })
    //     .catch(error => {
    //         // faire des choses avec l'erreur
    //         reject(error);
    //     })
    // })

    // méthode async/await
    // const result = await trucAsynchrone();
    // return result;

    /*
    Synopsis : récupère les flux toflit18
    ---
    Paramètres :
    * startYear : <int> # année de début
    * endYear : <int> # année de fin
    * params : <arr> # propriétés à renvoyer
    * [tous les noms de colonne des flux] : <arr/string> valeurs à filtrer dans les flux (peut être une ou plusieurs valeurs)
    */

    return new Promise((resolve, reject) => {

        let results = [];

        let finalStartYear = startYear; // on ne modif pas params en JS
        let finalEndYear = endYear;



        // 1. Test de la validité des paramètres
        if (startYear !== null && endYear === null) {
            return reject("You must put an end year");
        } // pas sure pour les accolades
        else if (endYear !== null && startYear === null) {
            return reject("You must put a start year");
        }

        if ((startYear !== null || endYear !== null) && year !== null) {
            finalStartYear = null;
            finalEndYear = null;
        }

        /* en l'état ça ne fonctionne pas */
        const URL = `${process.env.PUBLIC_URL}/data/toflit18_all_flows.csv`;
        get(URL) // get de axios
            .then(({ data: csvString }) => {
                // conversion en js (avec d3-dsv)
                const newData = csvParse(csvString);
                // faire des choses avec les résultats (filtres, ...)
                const finalData = _filterData(newData, { startYear: finalStartYear, endYear: finalEndYear, ...rest })
                resolve(newData);
            })
            .catch((err) => {
                reject(err);
            })

    })

}

function getToflitFlowsComponent() {
    return (
    getToflitFlowsByCsv({
        year:1789,
        customs_region:"La Rochelle"
    })
    );
  }
  
  export default getToflitFlowsComponent;



export const getPorticPointcallsByApi = ({
    filename,
    spec
}) => {

}

export const getPorticFlowsByApi = ({
    // startYear = null,
    // endYear = null,
    year = null,
    params = null,
    ...rest 
}) => {

    return new Promise((resolve, reject) => {

        let results = [];
        /*
        pour l'instant on ne gère pas le fait de gérer plusieurs années dans get_portic_flows

        let finalStartYear = startYear; // on ne modif pas params en JS
        let finalEndYear = endYear;

        // 1. Test de la validité des paramètres
        if (startYear !== null && endYear === null) {
            return reject("You must put an end year");
        } // pas sure pour les accolades
        else if (endYear !== null && startYear === null) {
            return reject("You must put a start year");
        }

        if ((startYear !== null || endYear !== null) && year !== null) {
            finalStartYear = null;
            finalEndYear = null;
        }
        */

        const URL = `http://data.portic.fr/api/flows/?date=${year}`;
        // équivalent à : const URL = 'http://data.portic.fr/api/flows/?date=' + year;
        get(URL) // get de axios
            .then(({ data: str }) => {
                // conversion en js (avec d3-dsv)
                // const newData = csvParse(csvString);
                try {
                    const newData = JSON.parse(str);
                    // contraire : JSON.stringify()
                    // faire des choses avec les résultats (filtres, ...)
                    const finalData = _filterData(newData, { /*startYear: finalStartYear, endYear: finalEndYear,*/ ...rest })
                    resolve(newData);
                } catch(e) {
                    reject(e);
                }
                
            })
            .catch((err) => {
                reject(err);
            })

    })

}

