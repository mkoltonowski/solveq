import sequelize from './databaseHelper';
async function databaseTest(){
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            return true;
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return false
        }
}

it('Handles the connection to the database (true/false)',()=>{
    return databaseTest().then(result=>{
        expect(result).toEqual(true);
    })
})