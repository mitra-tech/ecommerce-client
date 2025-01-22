import parse, { DOMNode, Element, HTMLReactParserOptions } from 'html-react-parser';
import { FC, ReactElement } from 'react';

import { IHtmlParserProps } from '../shared.interface';

const HtmlParser: FC<IHtmlParserProps> = ({ input }): ReactElement => {
  const parser = (input: string) => {
    const options: HTMLReactParserOptions = {
      // if the DOM Node is an instance of Element and it has the first child, and inside that first child there is a name property that is equal to <br> tag then we want to replace <br> with empty fragment
      replace: (domNode: DOMNode) => {
        if (domNode instanceof Element && domNode.firstChild && (domNode.firstChild as never)['name'] === 'br') {
          return <></>;
        }
      }
    };
    return <>{parse(input, options)}</>;
  };

  return <>{parser(input)}</>;
};

export default HtmlParser;
