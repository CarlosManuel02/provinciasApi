const { MongoClient } = require('mongodb');
require('dotenv').config();


async function main() {
    

    const client = new MongoClient(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Conectado a MongoDB Atlas");

        const database = client.db('Electiva')
        const collection = database.collection('provincias');

        const provincias = [
            { nombre: 'Santo Domingo', region: 'Ozama', poblacion: 965040, area: 1296 },
            { nombre: 'Santiago', region: 'Cibao', poblacion: 1049486, area: 2836 },
            { nombre: 'La Vega', region: 'Cibao', poblacion: 394205, area: 2287 },
            { nombre: 'Puerto Plata', region: 'Cibao', poblacion: 321597, area: 1805 },
            { nombre: 'Duarte', region: 'Cibao', poblacion: 384789, area: 1605 },
            { nombre: 'La Romana', region: 'Este', poblacion: 273391, area: 653 },
            { nombre: 'San Cristóbal', region: 'Sur', poblacion: 569930, area: 1240 },
            { nombre: 'San Pedro de Macorís', region: 'Este', poblacion: 237874, area: 1255 },
            { nombre: 'Barahona', region: 'Sur', poblacion: 187105, area: 1589 },
            { nombre: 'Monseñor Nouel', region: 'Cibao', poblacion: 198019, area: 992 },
            { nombre: 'San Juan', region: 'Sur', poblacion: 232333, area: 3569 },
            { nombre: 'La Altagracia', region: 'Este', poblacion: 409697, area: 2998 },
            { nombre: 'Peravia', region: 'Sur', poblacion: 184344, area: 785 },
            { nombre: 'Azua', region: 'Sur', poblacion: 221501, area: 2531 },
            { nombre: 'Espaillat', region: 'Cibao', poblacion: 231938, area: 839 },
        ]

        // Insertar provincias
        const result = await collection.insertMany(provincias);
        console.log(`${result.insertedCount} provincias insertadas`);

        // Imprimir provincias
        const todasLasProvincias = await collection.find().toArray();
        console.log('Provincias en la base de datos:');
        todasLasProvincias.forEach(provincia => console.log(provincia));
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
