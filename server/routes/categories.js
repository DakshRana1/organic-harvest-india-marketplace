import express from 'express';

const router = express.Router();

const categories = [
  {
    id: 'fruits',
    name: 'Fruits',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw9N8f42OJdyLAKwbFPdbDXPNeeMd8eakMup1eZOfgyef07gpsnYi5M7kw-fBj6zYz06ARyYJOgRzbPoVDs8X_hPm7Cd5j1cCim7b-WQdzThO-rRJd4fUHSV5C_tRPBpXzsF4sQJKcNwPxLrhJNbavaw80iGA-zq3wXV93WiV2Sq2lYvtNPkXPVc66-rcNUm_sojp4B1E2gPD-rKecZCCNHhalry2t7_EXjYGnAXZIIpDn18eRMzCapckuxt35iPCxHGPu5uuRmsQ',
  },
  {
    id: 'vegetables',
    name: 'Veggies',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnTiUII3W1UCHLi3BXdJmEyh9v_fNN6tpvBKCKkjSpuuGX99MB1mS2KTUWGCqbglxt20G1VBn3tEWahxwJECjg3iPUgETuTRkY9l17t_IDJTel414MNBPpm1RinF1Rn-f8sUbxXR5y2bXrNDEDOc0-rSCeba6U8QoH6-MHxkLLZ45vjSM3I4HavfLCF2CnqP-yVib9thQ07IpUBJjJoihRVdliUA_tPD2tc5U3ptJK5ypbwiq4KYDMkuTjWSt0LKbDW6K1SR5UlsQ',
  },
  {
    id: 'dairy',
    name: 'Dairy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlU0n7IyPz_tbJNp6764pDCr_2Un5pH8w7vIRvCVGzejpg5ZXOiAzwz7Ij3030M0Ir9QRCM0lDZwiepRGXLhZzhJVj9MpyD5FXDndymJ-W3UR3PbmWrRrXYaen5Z1152BwjT7RKQBMFHYvunZ-y-QEaSkkMUC5nQmxP-C3KnDEWJhaQXf62ku6Yrf0yBlpNVHqnMAQMfvMvgj7H6NLvk0ea6rlKdha5tdPrRUf9_ElE6anadtZD5elmytTFYmwK6ntyrOkUgdRQFI',
  },
  {
    id: 'grains',
    name: 'Grains',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChrNCe9HmdDKWNaInswWz1nayDi6miA9MlIyzC0_O_9gHwBsIT-84d8UVDgFNXQ2obkpeGY2FS6YF5YZXNXq9QrB948mZeCxkfE_lbYUulPulgccI7pCqcO7ljBOJlz96eoRD1densfDtYfadd2TYabP0ATsjsZ5Dj-htwcwkK_Zb75oH3-xb_1Jw6OGaeg0ctzpzkygBWlpWR3U_M1oW--X0ltAYOMPpfdBOu0z2krvayvUrT76uPFNQFvmoOp_TaBwaooPpM2XE',
  },
  {
    id: 'pantry',
    name: 'Pantry',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4leOQXr0331aYlMAjp3nsp-DfMNHozcJtK2To22PcZLbR2SWO6FxOXoXVjKEgdNKBeXCmeNZIkeYj4gSLUwT5S8uHjQNiVtEzR0FuMNVsptU9Cn2xUjXGTytdRJP2xMtKxtCj0SL4PyjHBG1O4mPoya5bFP1f9A67iG0yh5YqAI5ZcBoMyB05K73iueoo8fXmRSHsq3wtRQZLmKuYlsvy1Y7w5VHNjfz8ypMIWAZM0nQVIEovaV5iap2ybJaXb0rHLvaP2a5AqnU',
  },
];

router.get('/', (_req, res) => res.json(categories));

export default router;
