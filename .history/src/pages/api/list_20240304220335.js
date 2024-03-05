import { connectToDatabase } from "../../../lib/connectToDatabase";
import XLSX from 'xlsx';

export default async function handler(request, response){
    // Parse the XLS file
    const workbook = XLSX.readFile('./eido_ak.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]], { header: 1 });
    console.log(data)
    // Extract the 'nom' column
    const names = data.map(row => ({ name: row['nom'] }));

    try {
        // Connect to the MongoDB database
        const { mongoClient } = await connectToDatabase()

        // Get the 'eido' database and the 'name_list' collection
        const db = mongoClient.db('eido');
        const collection = db.collection('name_list');
        //console.log(names)
        // Insert the names into the collection
        //await collection.insertMany(names);

        response.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.log(error)
        response.status(500).json({ error: 'Unable to connect to database' });
    } 
}