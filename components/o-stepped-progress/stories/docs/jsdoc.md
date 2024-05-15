## Classes

<dl>
<dt><a href="#SteppedProgressStep">SteppedProgressStep</a></dt>
<dd><p>Represents a step in a stepped progress component.</p>
</dd>
<dt><a href="#SteppedProgress">SteppedProgress</a></dt>
<dd><p>Represents a stepped progress component.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SteppedProgress">SteppedProgress</a></dt>
<dd><p>Represents a stepped progress component.</p>
</dd>
</dl>

<a name="SteppedProgressStep"></a>

## SteppedProgressStep
Represents a step in a stepped progress component.

**Kind**: global class  
**Access**: public  

* [SteppedProgressStep](#SteppedProgressStep)
    * [new SteppedProgressStep(stepElement, parent)](#new_SteppedProgressStep_new)
    * [.isComplete()](#SteppedProgressStep+isComplete) ⇒ <code>boolean</code>
    * [.isCurrent()](#SteppedProgressStep+isCurrent) ⇒ <code>boolean</code>
    * [.isError()](#SteppedProgressStep+isError) ⇒ <code>boolean</code>
    * [.isFuture()](#SteppedProgressStep+isFuture) ⇒ <code>boolean</code>
    * [.markAsComplete()](#SteppedProgressStep+markAsComplete) ⇒ <code>void</code>
    * [.markAsCurrent()](#SteppedProgressStep+markAsCurrent) ⇒ <code>void</code>
    * [.markAsError()](#SteppedProgressStep+markAsError) ⇒ <code>void</code>
    * [.markAsFuture()](#SteppedProgressStep+markAsFuture) ⇒ <code>void</code>

<a name="new_SteppedProgressStep_new"></a>

### new SteppedProgressStep(stepElement, parent)
Class constructor.


| Param | Type | Description |
| --- | --- | --- |
| stepElement | <code>HTMLElement</code> | The step element in the DOM |
| parent | [<code>SteppedProgress</code>](#SteppedProgress) | The parent stepped progress instance |

<a name="SteppedProgressStep+isComplete"></a>

### steppedProgressStep.isComplete() ⇒ <code>boolean</code>
Get whether the step has the "complete" state.

**Kind**: instance method of [<code>SteppedProgressStep</code>](#SteppedProgressStep)  
**Returns**: <code>boolean</code> - Returns whether the step is complete.  
**Access**: public  
<a name="SteppedProgressStep+isCurrent"></a>

### steppedProgressStep.isCurrent() ⇒ <code>boolean</code>
Get whether the step has the "current" state.

**Kind**: instance method of [<code>SteppedProgressStep</code>](#SteppedProgressStep)  
**Returns**: <code>boolean</code> - Returns whether the step is current.  
**Access**: public  
<a name="SteppedProgressStep+isError"></a>

### steppedProgressStep.isError() ⇒ <code>boolean</code>
Get whether the step has the "error" state.

**Kind**: instance method of [<code>SteppedProgressStep</code>](#SteppedProgressStep)  
**Returns**: <code>boolean</code> - Returns whether the step has an error.  
**Access**: public  
<a name="SteppedProgressStep+isFuture"></a>

### steppedProgressStep.isFuture() ⇒ <code>boolean</code>
Get whether the step has no explicit state (and so is a future step).

**Kind**: instance method of [<code>SteppedProgressStep</code>](#SteppedProgressStep)  
**Returns**: <code>boolean</code> - Returns whether the step has no explicit state.  
**Access**: public  
<a name="SteppedProgressStep+markAsComplete"></a>

### steppedProgressStep.markAsComplete() ⇒ <code>void</code>
Set the step's state to "complete".

**Kind**: instance method of [<code>SteppedProgressStep</code>](#SteppedProgressStep)  
**Access**: public  
<a name="SteppedProgressStep+markAsCurrent"></a>

### steppedProgressStep.markAsCurrent() ⇒ <code>void</code>
Set the step's state to "current".

**Kind**: instance method of [<code>SteppedProgressStep</code>](#SteppedProgressStep)  
**Access**: public  
<a name="SteppedProgressStep+markAsError"></a>

### steppedProgressStep.markAsError() ⇒ <code>void</code>
Set the step's state to "error".

**Kind**: instance method of [<code>SteppedProgressStep</code>](#SteppedProgressStep)  
**Access**: public  
<a name="SteppedProgressStep+markAsFuture"></a>

### steppedProgressStep.markAsFuture() ⇒ <code>void</code>
Remove all states from the step (marking it as a future step).

**Kind**: instance method of [<code>SteppedProgressStep</code>](#SteppedProgressStep)  
**Access**: public  
<a name="SteppedProgress"></a>

## SteppedProgress
Represents a stepped progress component.

**Kind**: global class  
**Access**: public  

* [SteppedProgress](#SteppedProgress)
    * [new SteppedProgress(steppedProgressElement, [options])](#new_SteppedProgress_new)
    * _instance_
        * [.getSteps()](#SteppedProgress+getSteps) ⇒ [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep)
        * [.getCompletedSteps()](#SteppedProgress+getCompletedSteps) ⇒ [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep)
        * [.hasStepAtIndex(index)](#SteppedProgress+hasStepAtIndex) ⇒ <code>boolean</code>
        * [.getStepAtIndex(index)](#SteppedProgress+getStepAtIndex) ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
        * [.getCurrentStep()](#SteppedProgress+getCurrentStep) ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
        * [.getLastStep()](#SteppedProgress+getLastStep) ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
        * [.isComplete()](#SteppedProgress+isComplete) ⇒ <code>boolean</code>
        * [.getNextStep()](#SteppedProgress+getNextStep) ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
        * [.progress()](#SteppedProgress+progress) ⇒ <code>void</code>
    * _static_
        * [.getDataAttributes(steppedProgressElement)](#SteppedProgress.getDataAttributes) ⇒ <code>object</code>
        * [.init(rootElement, [options])](#SteppedProgress.init) ⇒ [<code>SteppedProgress</code>](#SteppedProgress) \| [<code>Array.&lt;SteppedProgress&gt;</code>](#SteppedProgress)

<a name="new_SteppedProgress_new"></a>

### new SteppedProgress(steppedProgressElement, [options])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| steppedProgressElement | <code>HTMLElement</code> |  | The component element in the DOM. |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the component. |

<a name="SteppedProgress+getSteps"></a>

### steppedProgress.getSteps() ⇒ [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep)
Get an array of steps.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep) - Returns an array of steps.  
**Access**: public  
<a name="SteppedProgress+getCompletedSteps"></a>

### steppedProgress.getCompletedSteps() ⇒ [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep)
Get an array of steps with a "completed" status.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep) - Returns an array of steps.  
**Access**: public  
<a name="SteppedProgress+hasStepAtIndex"></a>

### steppedProgress.hasStepAtIndex(index) ⇒ <code>boolean</code>
Get whether a step exists at a given index (0-based).

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: <code>boolean</code> - Returns whether a step exists at a given index.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index to check. |

<a name="SteppedProgress+getStepAtIndex"></a>

### steppedProgress.getStepAtIndex(index) ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
Get the step at a given index (0-based).

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>SteppedProgressStep</code>](#SteppedProgressStep) - Returns the step at the given index.  
**Throws**:

- <code>Error</code> Will throw an error if there is no step at the given index. Use [hasStepAtIndex](#SteppedProgress+hasStepAtIndex) to check.

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the step to get. |

<a name="SteppedProgress+getCurrentStep"></a>

### steppedProgress.getCurrentStep() ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
Get the step which has the "current" state. If there are multiple steps with this state then
the last one will be returned.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>SteppedProgressStep</code>](#SteppedProgressStep) - Returns the current step.  
**Access**: public  
<a name="SteppedProgress+getLastStep"></a>

### steppedProgress.getLastStep() ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
Get the last step in the stepped progress.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>SteppedProgressStep</code>](#SteppedProgressStep) - Returns the last step.  
**Access**: public  
<a name="SteppedProgress+isComplete"></a>

### steppedProgress.isComplete() ⇒ <code>boolean</code>
Get whether all steps have the "completed" state.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: <code>boolean</code> - Returns whether all steps are completed.  
**Access**: public  
<a name="SteppedProgress+getNextStep"></a>

### steppedProgress.getNextStep() ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
Get the next future step (a step which does not have the "current", "complete", or "error"
states). If no such step exists, the last step will be returned.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>SteppedProgressStep</code>](#SteppedProgressStep) - Returns the next step.  
**Access**: public  
<a name="SteppedProgress+progress"></a>

### steppedProgress.progress() ⇒ <code>void</code>
Mark the current step as "complete" and then mark the next step as "current". If all steps
have the "complete" state then this method does nothing.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Access**: public  
<a name="SteppedProgress.getDataAttributes"></a>

### SteppedProgress.getDataAttributes(steppedProgressElement) ⇒ <code>object</code>
Get the data attributes from the stepped progress element. If the component is being set up
declaratively, this method is used to extract the data attributes from the DOM.

**Kind**: static method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: <code>object</code> - Returns an options object constructed from the DOM.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| steppedProgressElement | <code>HTMLElement</code> | The component element in the DOM |

<a name="SteppedProgress.init"></a>

### SteppedProgress.init(rootElement, [options]) ⇒ [<code>SteppedProgress</code>](#SteppedProgress) \| [<code>Array.&lt;SteppedProgress&gt;</code>](#SteppedProgress)
Initialise stepped progress component.

**Kind**: static method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>SteppedProgress</code>](#SteppedProgress) \| [<code>Array.&lt;SteppedProgress&gt;</code>](#SteppedProgress) - Returns a stepped progress instance, or an array of instances.  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rootElement | <code>HTMLElement</code> \| <code>string</code> |  | The root element to intialise the component in, or a CSS selector for the root element |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the component |

<a name="SteppedProgress"></a>

## SteppedProgress
Represents a stepped progress component.

**Kind**: global typedef  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| steppedProgressElement | <code>HTMLElement</code> |  | The component element in the DOM. |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the component. |


* [SteppedProgress](#SteppedProgress)
    * [new SteppedProgress(steppedProgressElement, [options])](#new_SteppedProgress_new)
    * _instance_
        * [.getSteps()](#SteppedProgress+getSteps) ⇒ [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep)
        * [.getCompletedSteps()](#SteppedProgress+getCompletedSteps) ⇒ [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep)
        * [.hasStepAtIndex(index)](#SteppedProgress+hasStepAtIndex) ⇒ <code>boolean</code>
        * [.getStepAtIndex(index)](#SteppedProgress+getStepAtIndex) ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
        * [.getCurrentStep()](#SteppedProgress+getCurrentStep) ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
        * [.getLastStep()](#SteppedProgress+getLastStep) ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
        * [.isComplete()](#SteppedProgress+isComplete) ⇒ <code>boolean</code>
        * [.getNextStep()](#SteppedProgress+getNextStep) ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
        * [.progress()](#SteppedProgress+progress) ⇒ <code>void</code>
    * _static_
        * [.getDataAttributes(steppedProgressElement)](#SteppedProgress.getDataAttributes) ⇒ <code>object</code>
        * [.init(rootElement, [options])](#SteppedProgress.init) ⇒ [<code>SteppedProgress</code>](#SteppedProgress) \| [<code>Array.&lt;SteppedProgress&gt;</code>](#SteppedProgress)

<a name="new_SteppedProgress_new"></a>

### new SteppedProgress(steppedProgressElement, [options])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| steppedProgressElement | <code>HTMLElement</code> |  | The component element in the DOM. |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the component. |

<a name="SteppedProgress+getSteps"></a>

### steppedProgress.getSteps() ⇒ [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep)
Get an array of steps.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep) - Returns an array of steps.  
**Access**: public  
<a name="SteppedProgress+getCompletedSteps"></a>

### steppedProgress.getCompletedSteps() ⇒ [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep)
Get an array of steps with a "completed" status.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>Array.&lt;SteppedProgressStep&gt;</code>](#SteppedProgressStep) - Returns an array of steps.  
**Access**: public  
<a name="SteppedProgress+hasStepAtIndex"></a>

### steppedProgress.hasStepAtIndex(index) ⇒ <code>boolean</code>
Get whether a step exists at a given index (0-based).

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: <code>boolean</code> - Returns whether a step exists at a given index.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index to check. |

<a name="SteppedProgress+getStepAtIndex"></a>

### steppedProgress.getStepAtIndex(index) ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
Get the step at a given index (0-based).

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>SteppedProgressStep</code>](#SteppedProgressStep) - Returns the step at the given index.  
**Throws**:

- <code>Error</code> Will throw an error if there is no step at the given index. Use [hasStepAtIndex](#SteppedProgress+hasStepAtIndex) to check.

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the step to get. |

<a name="SteppedProgress+getCurrentStep"></a>

### steppedProgress.getCurrentStep() ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
Get the step which has the "current" state. If there are multiple steps with this state then
the last one will be returned.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>SteppedProgressStep</code>](#SteppedProgressStep) - Returns the current step.  
**Access**: public  
<a name="SteppedProgress+getLastStep"></a>

### steppedProgress.getLastStep() ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
Get the last step in the stepped progress.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>SteppedProgressStep</code>](#SteppedProgressStep) - Returns the last step.  
**Access**: public  
<a name="SteppedProgress+isComplete"></a>

### steppedProgress.isComplete() ⇒ <code>boolean</code>
Get whether all steps have the "completed" state.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: <code>boolean</code> - Returns whether all steps are completed.  
**Access**: public  
<a name="SteppedProgress+getNextStep"></a>

### steppedProgress.getNextStep() ⇒ [<code>SteppedProgressStep</code>](#SteppedProgressStep)
Get the next future step (a step which does not have the "current", "complete", or "error"
states). If no such step exists, the last step will be returned.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>SteppedProgressStep</code>](#SteppedProgressStep) - Returns the next step.  
**Access**: public  
<a name="SteppedProgress+progress"></a>

### steppedProgress.progress() ⇒ <code>void</code>
Mark the current step as "complete" and then mark the next step as "current". If all steps
have the "complete" state then this method does nothing.

**Kind**: instance method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Access**: public  
<a name="SteppedProgress.getDataAttributes"></a>

### SteppedProgress.getDataAttributes(steppedProgressElement) ⇒ <code>object</code>
Get the data attributes from the stepped progress element. If the component is being set up
declaratively, this method is used to extract the data attributes from the DOM.

**Kind**: static method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: <code>object</code> - Returns an options object constructed from the DOM.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| steppedProgressElement | <code>HTMLElement</code> | The component element in the DOM |

<a name="SteppedProgress.init"></a>

### SteppedProgress.init(rootElement, [options]) ⇒ [<code>SteppedProgress</code>](#SteppedProgress) \| [<code>Array.&lt;SteppedProgress&gt;</code>](#SteppedProgress)
Initialise stepped progress component.

**Kind**: static method of [<code>SteppedProgress</code>](#SteppedProgress)  
**Returns**: [<code>SteppedProgress</code>](#SteppedProgress) \| [<code>Array.&lt;SteppedProgress&gt;</code>](#SteppedProgress) - Returns a stepped progress instance, or an array of instances.  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rootElement | <code>HTMLElement</code> \| <code>string</code> |  | The root element to intialise the component in, or a CSS selector for the root element |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the component |

