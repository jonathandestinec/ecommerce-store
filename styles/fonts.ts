import localFont from 'next/font/local'

import { Volkhov, Poppins } from "next/font/google";

const digitalNumbers = localFont({
  src: '../public/fonts/DigitalNumbers-Regular.ttf',
  display: 'swap',
})

const volkhov = Volkhov({
    weight: ["400", "700"],
})

const poppins = Poppins({
    weight: ["400", "700"],
})

export { volkhov, poppins, digitalNumbers }