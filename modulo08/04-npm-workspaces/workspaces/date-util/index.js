import StringUtil from '@andersonnascimentoafsn/string-util'

const availableFormats = {
  'dd-mm-yyyy': '$<day>-$<month>-$<year>',
  'yyyy-mm-dd': '$<year>-$<month>-$<day>',
  'dd/mm/yyyy': '$<day>/$<month>/$<year>',
}

const yymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g
const ddmmyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g

const stringToDateExps = {
  'dd-mm-yyyy': ddmmyy,
  'yyyy-mm-dd': ddmmyy,
  'dd/mm/yyyy': yymmdd,
}

export default class DateUtil {
  static formatDate(date, format) {
    // !Reflect.ownKeys(availableFormats).includes(format)
    if (!Reflect.has(availableFormats, format)) {
      return { error: `the format ${format} is not available yet :(` }
    }

    const exp = availableFormats[format]

    const [result] = date.toISOString().match(yymmdd)

    // const [ok] = date.toISOString().replace(yymmdd, (match, group1, group2, group3) => {
    //   console.log(match)
    //   console.log('groups', group1, group2, group3)
    //   return 
    // })

    return result.replace(yymmdd, exp)
  }

  static formatString(dateStr, currentFormat, expectFormat) {
    if (StringUtil.isEmpty(dateStr)) {
      return { error: 'your text is empty' }
    }

    if (!Reflect.has(availableFormats, currentFormat)) {
      return { error: `the format ${currentFormat} is not available yet :(` }
    }

    if (!Reflect.has(availableFormats, expectFormat)) {
      return { error: `the format ${expectFormat} is not available yet :(` }
    }

    const toDateExp = stringToDateExps[currentFormat]

    const dateStrInIso = StringUtil
      .removeEmptySpaces(dateStr)
      .replace(toDateExp, '$<year>-$<month>-$<day>')

    const finalDate = new Date(dateStrInIso)

    return this.formatDate(finalDate, expectFormat)
  }
}