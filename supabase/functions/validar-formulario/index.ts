import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
} 

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    })
  }

  try {
    const body = await req.json()
    const { tablaBD, datosBD } = body

    // Comprobamos el email con una expresion regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!datosBD.email || !emailRegex.test(datosBD.email)) {
      throw new Error('Email inválido, revise de nuevo')
    }

    if (!datosBD.acepta_rgpd) {
      throw new Error('El usuario no ha aceptado la política de privacidad')
    }

    if (datosBD.cantidad && datosBD.cantidad < 1 || !Number.isInteger(datosBD.cantidad)) {
      throw new Error('La cantidad debe ser un número entero mayor o igual a 1')
    }
  
    //Si llegamosw hasta aqui los datos son seguros

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { data, error } = await supabaseClient.from(tablaBD).insert([datosBD])

    if (error) {
      throw new Error ('Error al insertar los datos' + error.mensaje)
    }
    return new Response(JSON.stringify({ success:true, message: "Datos guardados limpios y seguros"}), {
      headers: { ...corsHeaders, "Content-Type": "application/json"},
      status: 200,

    })  
  } catch (err:any) {
    return new Response(JSON.stringify({ success:false, message: "Error al insertar los datos" + err.message}), {
      headers: { ...corsHeaders, "Content-Type": "application/json"},
      status: 400,
    })
  }
});