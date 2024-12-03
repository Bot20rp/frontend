/* categoria  
Cervezas: Incluye cervezas lager, ales, stouts y cervezas artesanales.
Vinos: Comprende vinos tintos, blancos, rosados, espumosos y fortificados.
Licores: Incluye bebidas como ron, vodka, ginebra, tequila y whisky.
Bebidas espirituosas: Se refiere a bebidas con alta graduación alcohólica, como absenta y grappa.
Bebidas de aperitivo: Incluye vermut, amari y licores de hierbas.
Cócteles: Combinaciones de diferentes bebidas alcohólicas y otros ingredientes, como margaritas, mojitos y martinis.}
 */

/* alcoholicasssss */
import flor_caña from "../img/flor-cañaa.jpg";





import productImg03 from "../img/Corona_On.jpg";
import productImg04 from "../img/ducal_330.png";
import productImg05 from "../img/Golden_269.png";
import productImg06 from "../img/Huari_269.jpg";
import productImg07 from "../img/paceña_269.jpg";


import Campos_Solano_Oporto from "../img/Campos_Solano_Oporto.png";
import Campos_Solano_Ros from "../img/Campos_Solano_Ros.png";
import vino3 from "../img/vino-3.jpeg";
import vino4 from "../img/vino-4.jpeg";
import vino5 from "../img/vino-5.jpeg";
import vino6 from "../img/vino-6.jpeg";
import vino7 from "../img/vino-7.jpeg";


import licor1 from "../img/licores-1.jpeg";
import licor2 from "../img/licores-2.jpeg";
import licor3 from "../img/licores-3.jpeg";
import licor4 from "../img/licores-4.jpeg";
import licor5 from "../img/licores-5.jpeg";
import licor8 from "../img/licores-8.jpeg";
import licor7 from "../img/licores-7.jpeg";



import venta1 from "../img/cocacola_4.jpg";
import venta2 from "../img/aguasingas_14.jpg";
import venta3 from "../img/vino_15.png";
import venta4 from "../img/cocacola_8.jpg";
import venta5 from "../img/havana_36.png";
import venta6 from "../img/tinto_43.jpg";
import venta7 from "../img/cocacola_7.jpg";
import venta8 from "../img/aguasingas_14.jpg";
// jorgeeee

import bebidaaperitivo1 from "../img/bebidaaperitivo-1.jpeg";
import bebidaaperitivo2 from "../img/bebidaaperitivo-2.jpeg";

import bebidaespirituosa1 from "../img/bebidaespirituosa-1.jpeg";

/* la parte del slider  */
export const SliderData = [
  {
      id: 1,
      title: "combo1",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: productImg05,
  },
  {
      id: 2,
      title: "combo2",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: bebidaaperitivo1,
  },
  {
      id: 3,
      title: "combo3",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: Campos_Solano_Ros,
  },
  {
      id: 4,
      title: "comboo4",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: vino3,
  },
];

/* ------------servicios */
export const serviceData = [
  {
   /*  icon: <ion-icon name="car"></ion-icon>, */
    title: "loremmmmmmmm",
    subtitle: "Lorem ipsum dolor sit amet.",
    bg: "#fdefe6",
  },
  {
 /*    icon: <ion-icon name="card"></ion-icon>, */
    title: "loremmmmmmmmt",
    subtitle: "Lorem ipsum dolor sit amet.",
    bg: "#ceebe9",
  },
  {
   /*  icon: <ion-icon name="shield-half-outline"></ion-icon>, */
    title: "loremmmmmmmm",
    subtitle: "Lorem ipsum dolor sit amet.",
    bg: "#e2f2b2",
  },
  {
/*     icon: <ion-icon name="headset"></ion-icon>, */
    title: " loremmmmmmmm",
    subtitle: "Lorem ipsum dolor sit amet.",
    bg: "#d6e5fb",
  },
];



/* productos con combossss */

export const discoutProducts = [

  {
    id: "25",
    productName: "CocaCola 2Lt",
    imgUrl: venta1,
    category: "Cervezas",
    price: 15,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "26",
    productName: "Vital sin gas",
    imgUrl: venta2,
    category: "Cervezas",
    price: 29,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },


  {
    id: "27",
    productName: "Vino",
    imgUrl: venta3,
    category: "Cervezas",
    price: 15,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },


  {
    id: "28",
    productName: "Coca Cola Zero 3lt",
    imgUrl: venta4,
    category: "Cervezas",
    price: 16,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },


  {
    id: "29",
    productName: "Havana Especial 1lt",
    imgUrl: venta5,
    category: "Cervezas",
    price: 85,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "30",
    productName: "Kohlberg Tinto",
    imgUrl: venta6,
    category: "Cervezas",
    price: 26,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },







  {
    id: "03",
    productName: "flor de caña",
    imgUrl: flor_caña,
    category: "Cervezas",
    price: 70,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },


  {
    id: "31",
    productName: "Coca Cola Zero 2lt",
    imgUrl: venta7,
    category: "Cervezas",
    price: 12,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "32",
    productName: "Vital sin gas 2lt",
    imgUrl: venta8,
    category: "Cervezas",
    price: 7,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },
















  {
    id: "01",
    productName: "Campos Solano Oporto",
    imgUrl: Campos_Solano_Oporto,
    category: "Vinos",
    price: 30,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.7,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.5,
  },

  {
    id: "02",
    productName: "Campos Solano Rose ",
    imgUrl: Campos_Solano_Ros,
    category: "Vinos",
    price: 34,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },


  {
    id: "26",
    productName: "Golden lata",
    imgUrl: productImg06,
    category: "Cervezas",
    price: 5,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "04",
    productName: "bebidaaaa",
    imgUrl: bebidaespirituosa1,
    category: "Cervezas",
    price: 163,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "05",
    productName: "cocteless",
    imgUrl: licor7,
    category: "Cócteles",
    price: 163,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "06",
    productName: "Fllufy Sheep Sofa",
    imgUrl: productImg06,
    category: "sofa",
    price: 163,
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
    reviews: [
      {
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.9,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },
  
  ]












/* lsita de productosswsssss */
  export const products = [
    {
      id: "01",
      productName: "Campos Solano Oporto ",
      imgUrl: Campos_Solano_Oporto,
      category: "Vinos",
      price: 30,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
    },
  
    {
      id: "02",
      productName: "Campos Solano Rose ",
      imgUrl: Campos_Solano_Ros,
      category: "Vinos",
      price: 34,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.7,
    },
  
    {
      id: "03",
      productName: "flor de caña",
      imgUrl: flor_caña,
      category: "Cervezas",
      price: 70,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.6,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.7,
    },
    {
      id: "26",
      productName: "Golden lata",
      imgUrl: productImg06,
      category: "Cervezas",
      price: 5,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.7,
    },
    {
      id: "04",
      productName: "bebidaaaa",
      imgUrl: bebidaespirituosa1,
      category: "Bebidas espirituosas",
      price: 163,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.6,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.7,
    },
  
    {
      id: "05",
      productName: "cocteless",
      imgUrl: licor7,
      category: "Cócteles",
      price: 163,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.6,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.7,
    },
  
    {
      id: "06",
      productName: "Fllufy Sheep Sofa",
      imgUrl: productImg06,
      category: "sofa",
      price: 163,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.6,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.7,
    },
    {
      id: "07",
      productName: "Paceña lata 269 ml",
      imgUrl: productImg07,
      category: "chair",
      price: 5.5,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.6,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.7,
    },
  
    {
      id: "27",
      productName: "Modern Arm Sofa",
      imgUrl: flor_caña,
      category: "sofa",
      price: 173,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.6,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.7,
    },
  
    {
      id: "08",
      productName: "Paceña lata 269 ml",
      imgUrl: productImg07,
      category: "Cervezas",
      price: 5.5,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.6,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.7,
    },
  
    {
      id: "09",
      productName: "Helmar Chair",
      imgUrl: productImg05,
      category: "chair",
      price: 112,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.6,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.7,
    },
  
    {
      id: "10",
      productName: "bebidaaa",
      imgUrl: bebidaaperitivo2,
      category: "Bebidas de aperitivo",
      price: 799,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
    {
      id: "25",
      productName: "vinooo",
      imgUrl: vino5,
      category: "Vinos",
      price: 99,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.6,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.7,
    },
    {
      id: "11",
      productName: "vinoooo",
      imgUrl: vino6,
      category: "Vinos",
      price: 799,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
  
    {
      id: "12",
      productName: "licoree 8",
      imgUrl: licor3,
      category: "Licores",
      price: 599,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
  
    {
      id: "13",
      productName: "licoreee",
      imgUrl: licor4,
      category: "Licores",
      price: 799,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
  
    {
      id: "14",
      productName: "Corona One Way ",
      imgUrl: productImg03,
      category: "Cervezas",
      price: 899,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
  
    {
      id: "15",
      productName: "licoreeee",
      imgUrl: licor8,
      category: "Licores",
      price: 699,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
  
    {
      id: "16",
      productName: "licorrrrr",
      imgUrl: licor2,
      category: "Licores",
      price: 299,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
  
    {
      id: "17",
      productName: "Licorreeee",
      imgUrl: licor7,
      category: "Licores",
      price: 299,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
  
    {
      id: "18",
      productName: "icoreeee",
      imgUrl: licor5,
      category: "Licores",
      price: 299,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
  
    {
      id: "19",
      productName: "licoreee",
      imgUrl: licor2,
      category: "Licores",
      price: 399,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
  
    {
      id: "20",
      productName: "licor1",
      imgUrl: licor1,
      category: "Licores",
      price: 199,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
  
    {
      id: "21",
      productName: "ducal ",
      imgUrl: productImg04,
      category: "Cervezas",
      price: 6.5,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
    {
      id: "22",
      productName: "vinoss",
      imgUrl: vino3,
      category: "Vinos",
      price: 169,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
    {
      id: "23",
      productName: "vinoss",
      imgUrl: vino4,
      category: "Vinos",
      price: 139,
      shortDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.8,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          rating: 4.9,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.8,
    },
  
  ];