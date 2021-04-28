const kwargsTest = ({
  filename,
  spec,
  ...kwargs
}) => {
    console.log("filename : ", filename)
    console.log("spec : ", spec)
    console.log("kwargs : ", kwargs)
}

// export default kwargsTest;

kwargsTest({
    filename="un_fichier_inexistant.csv", 
    spec="[spec1: 'oui', spec2: 'non']", 
    year=1789, 
    customs_region='La Rochelle'
})
