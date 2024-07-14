import React, { useState } from 'react';
import ReactSelect from "react-select";

function App() {
  const [porte, setPorte] = useState('');
  const [barcode, setBarcode] = useState('');
  const [parkingCode, setParkingCode] = useState('');

  const handleParkingChange = (selectedOption) => {
    setParkingCode(selectedOption.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://16.171.20.170:8080/BarCode?porte=${porte}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parkingCode: parseInt(parkingCode) }),
      });
      if (!response.ok) {
        throw new Error("Failed to create barcode");
      }
      const barcodeBlob = await response.blob();
      const barcodeUrl = URL.createObjectURL(barcodeBlob);
      setBarcode(barcodeUrl);
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
              { value: "1", label: "MOROCCO MALL" },
              { value: "2", label: "MARJANE CALIFORNIE" },
              { value: "3", label: "CARREFOUR SIDI MAAROUF" },
            ]}
            onChange={handleParkingChange}
            styles={{
              control: (provided) => ({
                ...provided,
                width: '100%',
              }),
            }}
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
