'use client'

import { useState } from 'react'

export default function FiltroExtrato() {


  return (
    <div>
  <label for="Headline">
    <select
      name="Headline"
      id="Headline"
      class="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
    >
      <option value="">Selecione</option>
      <option value="jan">Janeiro</option>
      <option value="fev">Fevereiro</option>
      <option value="mar">Março</option>
      <option value="abr">Abril</option>
      <option value="mai">Maio</option>
      <option value="jun">Junho</option>
      <option value="jul">Julho</option>
      <option value="ago">Agosto</option>
      <option value="set">Setembro</option>
      <option value="out">Outubro</option>
      <option value="nov">Novembro</option>
      <option value="dez">Dezembro</option>
    </select>
  </label>
</div>
  )
}
