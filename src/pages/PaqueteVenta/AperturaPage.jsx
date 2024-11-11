import React, { useState,useEffect } from 'react'
import '../../css/AdmiVentaCss/AperturaPage.css'
import { TbBackground } from 'react-icons/tb';
import { useAuth } from '../../context/AuthContext';

function AperturaPage() {

    const {existeApertura,setExisteApertura}= useAuth();
    const [mostar, setMostrar] = useState(false);
    const [mostarInicioApertura, setMostrarInicioApertura] = useState(false);
    const [mostrarNuevaApertura,setMostrarNuevaApertura] = useState(true);
    const [mostrarCierreApertura,setMostrarCierreApertura] = useState(false);
    const [mostarNuevoCierreApertura,setMostarNuevoCierreApertura] =useState(false);

    useEffect(() => {
        // Si existe apertura, ocultar botón de nueva apertura y mostrar botón de cierre
        if (existeApertura) {
            setMostrarNuevaApertura(false);
            setMostrarCierreApertura(true);
        } else {
            // Si no existe apertura, restablece los valores por defecto
            setMostrarNuevaApertura(true);
            setMostrarCierreApertura(false);
        }
    }, [existeApertura]);
    


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
                        <input type="number" value={-1} disabled style={{ backgroundColor: "lightgray" }} />
                        <input type="number" disabled style={{ backgroundColor: "lightgray" }}
                        />
                    </div>
                    <div className='cuentas'>
                        <h4 id='c1'>Pago por Tarjeta</h4>
                        <input type="number" value={1} disabled style={{ backgroundColor: "lightgray" }} />
                        <input type="number" />
                        <input type="number" value={-1} disabled style={{ backgroundColor: "lightgray" }} />
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

            {mostrarNuevaApertura && (
                <button onClick={() => {
                    { setMostrar(true)}
                    { setMostrarInicioApertura(true) }
                    { setMostrarNuevaApertura(false) }
                }}> Nueva Apertura</button>
            )
            }

            { mostarInicioApertura &&(
                <button onClick={ () => {
                    {setMostrar(false)}
                    {setMostrarCierreApertura(true)}
                    {setMostrarInicioApertura(false)}
                }}>Iniciar Apertura</button>
            )
            }

            { mostrarCierreApertura && (
                <button onClick={() =>{
                    {setMostrar(true)}
                    {setMostarNuevoCierreApertura(true)}
                    {setMostrarCierreApertura(false)}
                }}>Comenzar Cierre</button>
            )

            }
            {mostarNuevoCierreApertura && (
                <button onClick={() =>{
                    {setMostrar(false)}
                    {setMostrarNuevaApertura(true)}
                    {setMostarNuevoCierreApertura(false)}
                }}>Cerrar Apertura</button>
            )

            }


        </div>
    )
}

export default AperturaPage
