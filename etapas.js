// Isso é basicamente um arquivo JSON puro

let etapas = [
    {
        titulo: 'VEREADOR',
        numeros: 5, //Quantidade de campos de números que irá aparecer para o usuário digitar
        candidatos: [ //objeto contendo os candidatos
            {
                numero: '38111',
                nome: 'Jacó da Guitarra',
                partido: 'GUITAROL',
                fotos:[
                    {url:'38111.jpg', legenda: 'Vereador'}
                ]
            },
            {
                numero: '77222',
                nome: 'Romilda do Piano',
                partido: 'PIANOL',
                fotos:[
                    {url:'77222.jpg', legenda: 'Vereador'}
                ]
            },
        ]
    },
    {
        titulo: 'PREFEITO',
        numeros: 2,
        candidatos: [
            {
                numero: '99',
                nome: 'Jessé da Banda',
                partido: 'DRUM',
                vice: 'Janicson',
                fotos:[
                    {url:'99.jpg', legenda: 'Prefeito'},
                    {url:'99_2.jpg', legenda: 'Vice-Prefeito', small: true}
                ]
            },
            {
                numero: '84',
                nome: 'Valter Flute',
                partido: 'SOPRO',
                vice: 'James',
                fotos:[
                    {url:'84.jpg', legenda: 'Prefeito'},
                    {url:'84_2.jpg', legenda: 'Vice-Prefeito', small: true}
                ]
            },
        ]
    }
];