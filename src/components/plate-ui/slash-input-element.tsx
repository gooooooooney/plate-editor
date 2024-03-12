import React from 'react';
import { withRef } from '@udecode/cn';
import { getHandler, PlateElement } from '@udecode/plate-common';

export const SlashInputElement = withRef<
  typeof PlateElement,
  {
    onClick?: (mentionNode: any) => void;
  }
>(({ className, onClick, ...props }, ref) => {
  const { children, element } = props;

  return (
    <PlateElement
      ref={ref}
      asChild
      data-slate-value={element.value}
      onClick={getHandler(onClick, element)}
      {...props}
    >
      <span>{children}</span>
    </PlateElement>
  );
});
