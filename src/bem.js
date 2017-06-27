export default function createBem(blockName, allowedModifiers = []) {
  return {
    block: (passedModifiers = {}) => [blockName]
      .concat(getBlockModifiersClassesFromObj(passedModifiers))
      .join(' '),
    element: (elementName, passedModifiers = {}) => {
      return [getElementClass(elementName)]
        .concat(getElementModifiersClassesFromObj(elementName, passedModifiers))
        .join(' ');
    }
  };

  function getBlockModifiersClassesFromObj(modifiersObj) {
    return allowedModifiers
      .filter( modifierName => modifiersObj.hasOwnProperty(modifierName) )
      .map( modifierName => applyModifier(blockName, modifierName, modifiersObj[modifierName]) );
  }

  function getElementModifiersClassesFromObj(elementName, modifiersObj) {
    const elementClass = getElementClass(elementName);

    let modifiersClasses = [];

    for (const modifier in modifiersObj){
      if (!modifiersObj.hasOwnProperty(modifier)) {
        continue;
      }
      modifiersClasses.push(applyModifier(elementClass, modifier, modifiersObj[modifier]));
    }

    return modifiersClasses;
  }

  function getElementClass(elementName) {
    return `${blockName}__${elementName}`;
  }
}

export function createReactBem(blockName, allowedModifiers = []) {
  const bemHelper = createBem(blockName, allowedModifiers);

  return {
    ...bemHelper,
    block: (props, passedModifiers = {}) => {
      let className = '';

      if (typeof props.className === 'string') {
        className = props.className;
      }

      const blockClass = bemHelper.block({ ...props, ...passedModifiers });

      return className + (blockClass ? ` ${blockClass}` : '');
    }
  };
}

function applyModifier(baseClass, modifierName, modifierValue) {
  if (!modifierValue || modifierValue === false) {
    return '';
  }

  let className = `${baseClass}--${modifierName}`;

  if (modifierValue && modifierValue !== true){
    className += `-${modifierValue}`;
  }

  return className;
}
