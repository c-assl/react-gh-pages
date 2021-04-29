import { get_toflit_flows_by_csv } from "./misc"

const kwargsTest = ({
  filename,
  spec,
  ...kwargs
}) => {
    console.log("filename : ", filename)
    console.log("spec : ", spec)
    console.log("kwargs : ", kwargs)
    for (let [key, filter_value] of Object.entries(kwargs)) {
        console.log("key : ", key, " / value : ", filter_value)
    }
}

// export default kwargsTest;

kwargsTest({
    filename: "un_fichier_inexistant.csv", 
    spec: "[spec1: 'oui', spec2: 'non']", 
    year: 1789, 
    customs_region: 'La Rochelle', 
    homeport: 'Bordeaux'
})

get_toflit_flows_by_csv()
