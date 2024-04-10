const { app } = require('@azure/functions');
const fs = require('fs/promises');
const path = require('path');

app.http('removeCar', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'removeCar/{cId}',
    handler: async (request, context) => {
        try {
            const index=request.params.cId;
            const cars = await fs.readFile(path.resolve(__dirname, '../cars.json'), 'utf-8');
            const data = JSON.parse(cars);

            if (index === -1) {
                context.error(404, 'CarNOtFOund');
            }
            else {
                data.splice(index, 1);
                await fs.writeFile(path.resolve(__dirname, '../cars.json'), JSON.stringify(data, null, 2));
                
                return { 
                    body: JSON.stringify(data) 
                };
            }
        }
        catch (error) {
            context.error(500, 'Removing Car err:', error);
        }
    }
});