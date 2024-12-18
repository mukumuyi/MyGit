export default function GenerateColorRange(start, end, count) {
    const rStart = parseInt(start.substr(1, 2), 16);
    const gStart = parseInt(start.substr(3, 2), 16);
    const bStart = parseInt(start.substr(5, 2), 16);
    const rEnd = parseInt(end.substr(1, 2), 16);
    const gEnd = parseInt(end.substr(3, 2), 16);
    const bEnd = parseInt(end.substr(5, 2), 16);
    const rInterval = (rEnd - rStart) / count;
    const gInterval = (gEnd - gStart) / count;
    const bInterval = (bEnd - bStart) / count;

    // console.log(rStart,",",gStart,",",bStart)
    // console.log(rEnd,",",gEnd,",",bEnd)
    // console.log(rInterval,",",gInterval,",",bInterval)

    const colorList = Array.from({ length: count }, (v, i) => {
      const result = []
      const rNum =
        "00" + (rStart + Math.ceil(i * rInterval)).toString(16).toUpperCase();
      const gNum =
        "00" + (gStart + Math.ceil(i * gInterval)).toString(16).toUpperCase();
      const bNum =
        "00" + (bStart + Math.ceil(i * bInterval)).toString(16).toUpperCase();
      // console.log("#" + rNum.substring(rNum.length - 2) + gNum.substring(gNum.length - 2) + bNum.substring(bNum.length - 2))
      result.id=i
      result.color=  "#" +
      rNum.substring(rNum.length - 2) +
      gNum.substring(gNum.length - 2) +
      bNum.substring(bNum.length - 2)
      return (
        result
      );
    });

    return colorList;
  }