const pool = require("./db_pg_connect");


// =====================================================
// SALVAR DADOS DO ESP32
// =====================================================

async function salvarDadosESP32(device_id, data_hora, dados) {

    const sql = `
        INSERT INTO public.esp32_dados
        (
            device_id,
            data_hora,
            dados
        )
        VALUES
        (
            $1,
            COALESCE($2, NOW()),
            $3::jsonb
        )
        RETURNING
            id,
            device_id,
            data_hora,
            dados
    `;

    const values = [
        device_id,
        data_hora || null,
        JSON.stringify(dados)
    ];

    const resultado = await pool.query(sql, values);

    return resultado.rows[0];
}


// =====================================================
// BUSCAR ÚLTIMOS DADOS
// =====================================================

async function buscarUltimosDados(device_id, limite = 24) {

    const sql = `
        SELECT
            id,
            device_id,
            data_hora,
            dados,
            created_at
        FROM public.esp32_dados
        WHERE device_id = $1
        ORDER BY data_hora DESC
        LIMIT $2
    `;

    const resultado = await pool.query(sql, [
        device_id,
        limite
    ]);

    return resultado.rows;
}


// =====================================================
// EXPORTAÇÃO
// =====================================================

module.exports = {
    salvarDadosESP32,
    buscarUltimosDados
};
