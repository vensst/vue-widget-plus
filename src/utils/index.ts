let zIndex = 2025;

export function useZIndex() {
  const nextZIndex = () => ++zIndex;
  return {
    nextZIndex
  };
}


// export function isChartEmpty(option?: EChartsOption) {
//   if (!option) return true
//
//   const series = option.series as SeriesOption[] | undefined
//   if (!series || !series.length) return true
//
//   return series.every((s: any) => {
//     if (!s.data) return true
//     return Array.isArray(s.data) && s.data.length === 0
//   })
// }
