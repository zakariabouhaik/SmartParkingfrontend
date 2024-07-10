import React, { useState, useEffect } from 'react';

function App() {
  const [porte, setPorte] = useState('');
  const [barcode, setBarcode] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://16.171.20.170:8080/BarCode?porte=${porte}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <div style={styles.container}>
      <h3 style={styles.heading}>la porte :</h3>
      <input
        style={styles.input}
        className='input'
        type='text'
        placeholder='Entrer le numéro de porte'
        value={porte}
        onChange={(e) => setPorte(e.target.value)}
      />
      {barcode && <img src={barcode} alt="Generated Barcode" style={styles.barcode} />}
      <button style={styles.button} onClick={handleSubmit} type='button'>Valider</button>
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
  heading: {
    padding: '0px'
  },
  input: {
    marginTop: '20px'  // Ajout de la marge supérieure pour espacer le champ de saisie du texte en dessous
  },
  barcode: {
    marginTop: '20px',
    width: '300px',  // Ajuster la largeur selon les besoins
    height: '100px'  // Ajuster la hauteur selon les besoins
  },
  button: {
    marginTop: '10px'
  }
};

export default App;
