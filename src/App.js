import React, { useState } from 'react';
import ReactSelect from "react-select";

function App() {
  const [porte, setPorte] = useState('');
  const [barcode, setBarcode] = useState('');
  const [parkingCode, setParkingCode] = useState('');
  const [prix, setPrix] = useState('');
  const [imageparking,setImageparking]= useState('');

  const handleParkingChange = (selectedOption) => {
    setParkingCode(selectedOption.value);
    setPrix(selectedOption.prix)
    setImageparking(selectedOption.imageparking)
  };
  

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://er8wa98ace.execute-api.us-east-1.amazonaws.com/dev/createBardCode', {
        method: "POST",
        
        body: JSON.stringify({ porte:porte,
          parking:parkingCode,
          prix:prix,
          imageparking:imageparking
         }),
      });
      if (!response.ok) {
        throw new Error("Failed to create barcode");
      }
      const data = await response.json();
      setBarcode(data.barcodeImage)
       
    } catch (error) {
      console.error("Error creating barcode:", error);
    }
  };

  return (
    <div style={{...styles.container}}>
      <div style={{
       ...styles.porte
      }}>
        <div style={{paddingBottom:"20px", textAlign: 'center'}}>
          <h3 style={styles.heading}>La porte :</h3>
          <input 
            style={{...styles.input, width: '100%'}} 
            type='text' 
            placeholder='Entrer le numéro de porte' 
            value={porte} 
            onChange={(e) => setPorte(e.target.value)} 
          />
        </div>
        <div style={{
          paddingBottom:"20px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "10px",
          width: '100%',
          textAlign: 'center'
        }}>
          <label htmlFor='selectOption'>Selectionner Votre Parking</label>
          <ReactSelect 
            id="selectOption" 
            options={[
              { value: "MOROCCO MALL", label: "MOROCCO MALL",prix:"5",imageparking:"https://upload.wikimedia.org/wikipedia/commons/9/99/Logo_Morocco_Mall.png" },
              { value: "MARJANE CALIFORNIE", label: "MARJANE CALIFORNIE",prix:"5",imageparking:"https://play-lh.googleusercontent.com/tz1ySx3X4GXk-erElWv-lEeRBmPa68BwEFlffRNhWjPceC2TrfGXAoIHIsLpM_qZDO0=w240-h480-rw"},
              { value: "CARREFOUR SIDI MAAROUF", label: "CARREFOUR SIDI MAAROUF",prix:"5",imageparking:"https://upload.wikimedia.org/wikipedia/fr/thumb/3/3b/Logo_Carrefour.svg/640px-Logo_Carrefour.svg.png" },
              { value: "TechnoPark", label: "TechnoPark",prix:"5",imageparking:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV6ICXikfpiSk7Ld-bvN8NCs_N5R-BLuCamw&s" },
              { value: "Atacadao", label: "Atacadao",prix:"5",imageparking:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbo7q7BvskP04kAYg1RVb1Q3-a7nLyFBMig&s" },
              { value: "Rue Moulay Bouchaib", label: "Rue Moulay Bouchaib",prix:"2",imageparking:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPQv-Kec1ZAvn1wOh6gOfLNwktG6Prb0TvQ&s" },
              { value: "3 Rue Ibn Bouraid", label: "3 Rue Ibn Bouraid" ,prix:"2",imageparking:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPQv-Kec1ZAvn1wOh6gOfLNwktG6Prb0TvQ&s"},
              { value: "1 Rue Al Mortada", label: "1 Rue Al Mortada",prix:"2",imageparking:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPQv-Kec1ZAvn1wOh6gOfLNwktG6Prb0TvQ&s" },
              { value: "Rue Charam Achaykh", label: "Rue Charam Achaykh",prix:"2",imageparking:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPQv-Kec1ZAvn1wOh6gOfLNwktG6Prb0TvQ&s" },
              { value: "Rue du Louvre", label: "Rue du Louvre",prix:"2",imageparking:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPQv-Kec1ZAvn1wOh6gOfLNwktG6Prb0TvQ&s" },
              
            ]}
            onChange={handleParkingChange}
            styles={{
              control: (provided) => ({
                ...provided,
                width: '100%',
              }),
              menu:(provided)=>({
                ...provided,
                maxHeight:'120px'
              })
            }}
            maxMenuHeight={120}
          />
        </div>
        {barcode && <img src={barcode} alt="Generated Barcode" style={{...styles.barcode, maxWidth: '100%'}} />}
        <button style={{...styles.button, width: '100%'}} onClick={handleSubmit} type='button'>Valider</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },

  porte:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '300px',
  },

  heading: {
    padding: '0px'

  },
  input: {
    marginTop: '20px'  // Ajout de la marge supérieure pour espacer le champ de saisie du texte en dessous
  },
  barcode: {
    marginTop: '20px',
    width: '300px',
    height: '100px'  // Ajuster la hauteur selon les besoins
  },
  button: {
    marginTop: '10px'
  }
};

export default App;
