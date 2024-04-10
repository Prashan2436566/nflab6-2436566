const { app } = require('@azure/functions');
const fs = require('fs/promises');
const path = require('path');

app.http('removeCar', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'removeCar/{cId}',
    handler: async (request, context) => {
        try {
            const i=request.params.cId;
            const cars = await fs.readFile(path.resolve(__dirname, '../cars.json'), 'utf-8');
            const datal = JSON.parse(cars);

            if (i === -1) {
                context.error(404, 'CarNOtFOund');
            }
            else {
                datal.splice(i, 1);
                await fs.writeFile(path.resolve(__dirname, '../cars.json'), JSON.stringify(datal, null, 2));
                
                return { 
                    body: JSON.stringify(datal) 
                };
            }
            //return { body: JSON.stringify(data) };
        }
        catch (error) {
            context.error(500, 'Removing Car err:', error);
        }
    }
});