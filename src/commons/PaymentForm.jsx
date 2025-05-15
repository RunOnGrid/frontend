import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { TokenService } from '../../tokenHandler';

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [debugInfo, setDebugInfo] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setErrorMessage('Stripe no está cargado correctamente. Por favor, recarga la página.');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    setDebugInfo(null);
    
    try {
      // Obtener el token de autorización
      const tokens = TokenService.getTokens();
      const accessToken = tokens.tokens.accessToken;
      
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ 
          amount: 1000,
          currency: "USD"
        }),
      });
      
      console.log('Respuesta recibida, status:', response.status);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
        }
        throw new Error(data.message || 'Error al crear el payment intent');
      }
      
     
      if (!data.clientSecret) {
        console.error('Respuesta sin clientSecret:', data);
        throw new Error('No se recibió un clientSecret válido del servidor');
      }
      
      const clientSecret = data.clientSecret;
      console.log('clientSecret obtenido:', clientSecret.substring(0, 10) + '...');
      
      // 2. Confirmar el pago con Stripe
      console.log('Iniciando confirmCardPayment...');
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      
      if (error) {
        console.error('Error en confirmCardPayment:', error);
        throw new Error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        console.log('Pago exitoso!', paymentIntent);
        setPaymentSuccess(true);
      } else {
        console.warn('Estado inesperado del paymentIntent:', paymentIntent.status);
        throw new Error(`Estado de pago inesperado: ${paymentIntent.status}`);
      }
    } catch (err) {
      console.error('Error en el proceso de pago:', err);
      setErrorMessage(err.message || 'Hubo un problema al procesar tu pago. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      {paymentSuccess ? (
        <div className="success-message">¡Pago procesado con éxito! Gracias por tu compra.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Información de tarjeta</label>
            <div className="card-element-container">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      fontFamily: "Inter, system-ui, sans-serif",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#e53e3e",
                    },
                  },
                }}
              />
            </div>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {debugInfo && (
            <div className="debug-info">
              <strong>Debug Info:</strong>
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          )}

          <button type="submit" disabled={!stripe || isLoading} className="payment-button">
            {isLoading ? "Procesando..." : "Pagar"}
          </button>
        </form>
      )}
    </div>
  )
}