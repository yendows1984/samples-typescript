/**
 * オブジェクトのプロパティを文字列で返却します。
 * 
 * return object's property name as string.
 * @param obj 
 * @param propExpression 
 * @returns propExpression で指定したプロパティ文字列
 * @example
 * interface Obj {
 *   propStr: string;
 *   propBool: boolean;
 *   propNum: number;
 *   propFn: Function;
 * }
 *
 * const obj: Obj = {
 *   propStr: 'string',
 *   propBool: true,
 *   propNum: 0,
 *   propFn: () => 'fn',
 * };
 *
 * const a = propAsStr(obj, (obj) => obj.propStr);   // a === 'propStr'
 * const b = propAsStr(obj, (obj) => obj.propBool);  // b === 'propBool'
 * const c = propAsStr(obj, (obj) => obj.propNum);   // c === 'propNum'
 * const d = propAsStr(obj, (obj) => obj.propFn);    // d === 'propFn'
 */
export const propAsStr = <T>(obj: T, propExpression: (obj: T) => unknown): IPropName => {
  // T と構造のみが等しい (値は等しくない) のオブジェクトを作成する。
  const propNameGetterHolder: IPorpNameGetterHolder = {};
  // 作成したオブジェクトの value に、prop (文字列) を返す function をセットする。
  Object.keys(obj).map((prop) => { propNameGetterHolder[prop] = () => prop });

  // propExpression で、
  const propGetter = propExpression(propNameGetterHolder as unknown as T) as IPorpNameGetter;
  return propGetter();
}

/** 型に意味を込めたいだけ */
type IPropName = String;

/** prop (文字列) を返す function のインターフェイスです。 */
interface IPorpNameGetter {
  (): IPropName;
}
/** T と構造のみが等しいオブジェクトです。 */
interface IPorpNameGetterHolder {
  [prop: string]: IPorpNameGetter;
}

interface Obj {
  propStr: string;
  propBool: boolean;
  propNum: number;
  propFn: Function;
}

const obj: Obj = {
  propStr: 'string',
  propBool: true,
  propNum: 0,
  propFn: () => 'fn',
};

console.log(propAsStr(obj, (obj) => obj.propStr));
console.log(propAsStr(obj, (obj) => obj.propBool));
console.log(propAsStr(obj, (obj) => obj.propNum));
console.log(propAsStr(obj, (obj) => obj.propFn));
