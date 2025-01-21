export const convertDate = (initialDate: string) => {
    const arr = initialDate.split('/').reverse()
    
    return arr.join('/') 
}