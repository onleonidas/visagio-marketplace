/** 
 * Function to format a number to currency in BRL format
 */
export const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};