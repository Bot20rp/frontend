import React, { useState } from 'react'
import '../../css/AdmiVentaCss/AperturaPage.css'
import { TbBackground } from 'react-icons/tb';

function AperturaPage() {

    const [mostar, setMostrar] = useState(false);



    return (
        <div className='contieneApertura'>
            <h2>Apertura y Cierre del Punto de Venta el Bunker</h2>

            {mostar && (

                <div className='aperturas'>
                    <div className='cuentas'>
                        <h3 id='c1'>Cuenta</h3>
                        <h3 id='c1'>Saldo Teórico</h3>
                        <h3 id='c1'> Recuento</h3>
                        <h3 id='c1'>Diferencia</h3>
                        <h3 id='c1'>Caja Chica</h3>
                    </div>
                    <div className='cuentas'>
                        <h4 id='c1'>Pago por Efectivo</h4>
                        <input type="number" value={1} disabled style={{ backgroundColor: "lightgray" }} />
                        <input type="number" />
                        <input type="number" value={-1} disabled style={{ backgroundColor: "lightgray" }} />
                        <input type="number" />
                    </div>
                    <div className='cuentas'>
                        <h4 id='c1'>Pago por QR</h4>
                        <input type="number" value={1} disabled style={{ backgroundColor: "lightgray" }} />
                        <input type="number" />
                        <input type="number" value={-1} disabled style={{ backgroundColor: "lightgray" }}/>
                        <input type="number" disabled style={{ backgroundColor: "lightgray" }}
                        />
                    </div>
                    <div className='cuentas'>
                        <h4 id='c1'>Pago por Tarjeta</h4>
                        <input type="number" value={1} disabled style={{ backgroundColor: "lightgray" }} />
                        <input type="number" />
                        <input type="number" value={-1} disabled style={{ backgroundColor: "lightgray" }}/>
                        <input type="number" disabled style={{ backgroundColor: "lightgray" }} 
                        />

                    </div>
                    <div className='cuentas'>
                        <h4 id='c1'>Sub Total</h4>
                        <input type="number" />
                    </div>
                    <div className='cuentas'>
                        <h4 id='c1'>Total</h4>
                        <input type="number" />
                    </div>
                </div>

            )}

            <button onClick={() => { mostar === false ? setMostrar(true) : setMostrar(false) }}> probando</button>
        </div>
    )
}

export default AperturaPage
