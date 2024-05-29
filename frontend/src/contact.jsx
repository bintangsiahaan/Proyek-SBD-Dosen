import React from 'react';

const Contact = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f1a2b',
    }}>
      <h2 style={{
        color: '#CDEEFD',
        textAlign: 'center',
        fontFamily: 'EB Garamond',
        fontSize: '23px',
        marginBottom: '13px',
      }}>CONTACT INFORMATION</h2>
      <p style={{
        color: 'white',
        backgroundColor: 'steelblue',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px 0',
        fontSize: '18px',
      }}>Nomor HP: 085260897437</p>
      <p style={{
        color: 'white',
        backgroundColor: 'steelblue',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px 0',
        fontSize: '18px',
      }}>Line: chatrinejessica0518</p>
      <p style={{
        color: 'white',
        backgroundColor: 'steelblue',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px 0',
        fontSize: '18px',
      }}>Instagram: bintangshn_</p>
    </div>
  );
};

export default Contact;
