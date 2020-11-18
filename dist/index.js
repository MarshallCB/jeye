'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var path = require('path');
var path__default = _interopDefault(path);

/* es-module-lexer 0.3.26 */
const A=1===new Uint8Array(new Uint16Array([1]).buffer)[0];function parse(E,g="@"){if(!B)return init.then(()=>parse(E));const I=E.length+1,D=(B.__heap_base.value||B.__heap_base)+4*I-B.memory.buffer.byteLength;D>0&&B.memory.grow(Math.ceil(D/65536));const w=B.sa(I-1);if((A?C:Q)(E,new Uint16Array(B.memory.buffer,w,I)),!B.parse())throw Object.assign(new Error(`Parse error ${g}:${E.slice(0,B.e()).split("\n").length}:${B.e()-E.lastIndexOf("\n",B.e()-1)}`),{idx:B.e()});const L=[],k=[];for(;B.ri();)L.push({s:B.is(),e:B.ie(),ss:B.ss(),se:B.se(),d:B.id()});for(;B.re();)k.push(E.slice(B.es(),B.ee()));return [L,k,!!B.f()]}function Q(A,Q){const C=A.length;let B=0;for(;B<C;){const C=A.charCodeAt(B);Q[B++]=(255&C)<<8|C>>>8;}}function C(A,Q){const C=A.length;let B=0;for(;B<C;)Q[B]=A.charCodeAt(B++);}let B;const init=WebAssembly.compile((E="AGFzbQEAAAABWAxgAX8Bf2AEf39/fwBgAn9/AGAAAX9gAABgBn9/f39/fwF/YAR/f39/AX9gA39/fwF/YAd/f39/f39/AX9gBX9/f39/AX9gAn9/AX9gCH9/f39/f39/AX8DLy4AAQIDAwMDAwMDAwMDAwAEBAAFBAQAAAAABAQEBAQABQYHCAkKCwMCAAAKAwgLBAUBcAEBAQUDAQABBg8CfwFB8PAAC38AQfDwAAsHWg8GbWVtb3J5AgACc2EAAAFlAAMCaXMABAJpZQAFAnNzAAYCc2UABwJpZAAIAmVzAAkCZWUACgJyaQALAnJlAAwBZgANBXBhcnNlAA4LX19oZWFwX2Jhc2UDAQqjMy5oAQF/QQAgADYCtAhBACgCkAgiASAAQQF0aiIAQQA7AQBBACAAQQJqIgA2ArgIQQAgADYCvAhBAEEANgKUCEEAQQA2AqQIQQBBADYCnAhBAEEANgKYCEEAQQA2AqwIQQBBADYCoAggAQudAQECf0EAKAKkCCIEQRRqQZQIIAQbQQAoArwIIgU2AgBBACAFNgKkCEEAIAQ2AqgIQQAgBUEYajYCvAggBSAANgIIAkACQEEAKAKICCADRw0AIAUgAjYCDAwBCwJAQQAoAoQIIANHDQAgBSACQQJqNgIMDAELIAVBACgCkAg2AgwLIAVBADYCFCAFIAM2AhAgBSACNgIEIAUgATYCAAtIAQF/QQAoAqwIIgJBCGpBmAggAhtBACgCvAgiAjYCAEEAIAI2AqwIQQAgAkEMajYCvAggAkEANgIIIAIgATYCBCACIAA2AgALCABBACgCwAgLFQBBACgCnAgoAgBBACgCkAhrQQF1CxUAQQAoApwIKAIEQQAoApAIa0EBdQsVAEEAKAKcCCgCCEEAKAKQCGtBAXULFQBBACgCnAgoAgxBACgCkAhrQQF1CzsBAX8CQEEAKAKcCCgCECIAQQAoAoQIRw0AQX8PCwJAIABBACgCiAhHDQBBfg8LIABBACgCkAhrQQF1CxUAQQAoAqAIKAIAQQAoApAIa0EBdQsVAEEAKAKgCCgCBEEAKAKQCGtBAXULJQEBf0EAQQAoApwIIgBBFGpBlAggABsoAgAiADYCnAggAEEARwslAQF/QQBBACgCoAgiAEEIakGYCCAAGygCACIANgKgCCAAQQBHCwgAQQAtAMQIC4UMAQV/IwBBgPAAayIBJABBAEEBOgDECEEAQf//AzsByghBAEEAKAKMCDYCzAhBAEEAKAKQCEF+aiICNgLgCEEAIAJBACgCtAhBAXRqIgM2AuQIQQBBADsBxghBAEEAOwHICEEAQQA6ANAIQQBBADYCwAhBAEEAOgCwCEEAIAFBgNAAajYC1AhBACABQYAQajYC2AhBAEEAOgDcCAJAAkACQANAQQAgAkECaiIENgLgCAJAAkACQAJAIAIgA08NACAELwEAIgNBd2pBBUkNAyADQZt/aiIFQQRNDQEgA0EgRg0DAkAgA0EvRg0AIANBO0YNAwwGCwJAIAIvAQQiBEEqRg0AIARBL0cNBhAPDAQLEBAMAwtBACEDIAQhAkEALQCwCA0GDAULAkACQCAFDgUBBQUFAAELIAQQEUUNASACQQRqQe0AQfAAQe8AQfIAQfQAEBJFDQEQEwwBC0EALwHICA0AIAQQEUUNACACQQRqQfgAQfAAQe8AQfIAQfQAEBJFDQAQFEEALQDECA0AQQBBACgC4AgiAjYCzAgMBAtBAEEAKALgCDYCzAgLQQAoAuQIIQNBACgC4AghAgwACwtBACACNgLgCEEAQQA6AMQICwNAQQAgAkECaiIDNgLgCAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCACQQAoAuQITw0AIAMvAQAiBEF3akEFSQ0OIARBYGoiBUEJTQ0BIARBoH9qIgVBCU0NAgJAAkACQCAEQYV/aiIDQQJNDQAgBEEvRw0QIAIvAQQiAkEqRg0BIAJBL0cNAhAPDBELAkACQCADDgMAEQEACwJAQQAoAswIIgQvAQBBKUcNAEEAKAKkCCICRQ0AIAIoAgQgBEcNAEEAQQAoAqgIIgI2AqQIAkAgAkUNACACQQA2AhQMAQtBAEEANgKUCAsgAUEALwHICCICakEALQDcCDoAAEEAIAJBAWo7AcgIQQAoAtgIIAJBAnRqIAQ2AgBBAEEAOgDcCAwQC0EALwHICCICRQ0JQQAgAkF/aiIDOwHICAJAIAJBAC8ByggiBEcNAEEAQQAvAcYIQX9qIgI7AcYIQQBBACgC1AggAkH//wNxQQF0ai8BADsByggMCAsgBEH//wNGDQ8gA0H//wNxIARJDQkMDwsQEAwPCwJAAkACQAJAQQAoAswIIgQvAQAiAhAVRQ0AIAJBVWoiA0EDSw0CAkACQAJAIAMOBAEFAgABCyAEQX5qLwEAQVBqQf//A3FBCkkNAwwECyAEQX5qLwEAQStGDQIMAwsgBEF+ai8BAEEtRg0BDAILAkAgAkH9AEYNACACQSlHDQFBACgC2AhBAC8ByAhBAnRqKAIAEBZFDQEMAgtBACgC2AhBAC8ByAgiA0ECdGooAgAQFw0BIAEgA2otAAANAQsgBBAYDQAgAkUNAEEBIQQgAkEvRkEALQDQCEEAR3FFDQELEBlBACEEC0EAIAQ6ANAIDA0LQQAvAcoIQf//A0ZBAC8ByAhFcUEALQCwCEVxIQMMDwsgBQ4KDAsBCwsLCwIHBAwLIAUOCgIKCgcKCQoKCggCCxAaDAkLEBsMCAsQHAwHC0EALwHICCICDQELEB1BACEDDAgLQQAgAkF/aiIEOwHICEEAKAKkCCICRQ0EIAIoAhBBACgC2AggBEH//wNxQQJ0aigCAEcNBCACIAM2AgQMBAtBAEEALwHICCICQQFqOwHICEEAKALYCCACQQJ0akEAKALMCDYCAAwDCyADEBFFDQIgAi8BCkHzAEcNAiACLwEIQfMARw0CIAIvAQZB4QBHDQIgAi8BBEHsAEcNAgJAAkAgAi8BDCIEQXdqIgJBF0sNAEEBIAJ0QZ+AgARxDQELIARBoAFHDQMLQQBBAToA3AgMAgsgAxARRQ0BIAJBBGpB7QBB8ABB7wBB8gBB9AAQEkUNARATDAELQQAvAcgIDQAgAxARRQ0AIAJBBGpB+ABB8ABB7wBB8gBB9AAQEkUNABAUC0EAQQAoAuAINgLMCAtBACgC4AghAgwACwsgAUGA8ABqJAAgAwtQAQR/QQAoAuAIQQJqIQBBACgC5AghAQJAA0AgACICQX5qIAFPDQEgAkECaiEAIAIvAQBBdmoiA0EDSw0AIAMOBAEAAAEBCwtBACACNgLgCAt3AQJ/QQBBACgC4AgiAEECajYC4AggAEEGaiEAQQAoAuQIIQEDQAJAAkACQCAAQXxqIAFPDQAgAEF+ai8BAEEqRw0CIAAvAQBBL0cNAkEAIABBfmo2AuAIDAELIABBfmohAAtBACAANgLgCA8LIABBAmohAAwACwsdAAJAQQAoApAIIABHDQBBAQ8LIABBfmovAQAQHgs/AQF/QQAhBgJAIAAvAQggBUcNACAALwEGIARHDQAgAC8BBCADRw0AIAAvAQIgAkcNACAALwEAIAFGIQYLIAYL6QIBBH9BAEEAKALgCCIAQQxqIgE2AuAIAkACQAJAAkACQBAmIgJBWWoiA0EHTQ0AIAJBIkYNAiACQfsARg0CDAELAkACQCADDggDAQIDAgICAAMLQQBBACgC4AhBAmo2AuAIECZB7QBHDQNBACgC4AgiAy8BBkHhAEcNAyADLwEEQfQARw0DIAMvAQJB5QBHDQNBACgCzAgvAQBBLkYNAyAAIAAgA0EIakEAKAKICBABDwtBACgC2AhBAC8ByAgiA0ECdGogADYCAEEAIANBAWo7AcgIQQAoAswILwEAQS5GDQIgAEEAKALgCEECakEAIAAQAQ8LQQAoAuAIIAFGDQELQQAvAcgIDQFBACgC4AghA0EAKALkCCEBAkADQCADIAFPDQECQAJAIAMvAQAiAkEnRg0AIAJBIkcNAQsgACACECcPC0EAIANBAmoiAzYC4AgMAAsLEB0LDwtBAEEAKALgCEF+ajYC4AgLiAYBBH9BAEEAKALgCCIAQQxqIgE2AuAIECYhAgJAAkACQAJAAkACQEEAKALgCCIDIAFHDQAgAhAoRQ0BCwJAAkACQAJAIAJBn39qIgFBC00NAAJAAkAgAkEqRg0AIAJB9gBGDQUgAkH7AEcNA0EAIANBAmo2AuAIECYhA0EAKALgCCEBA0AgA0H//wNxECkaQQAoAuAIIQIQJhoCQCABIAIQKiIDQSxHDQBBAEEAKALgCEECajYC4AgQJiEDC0EAKALgCCECAkAgA0H9AEYNACACIAFGDQwgAiEBIAJBACgC5AhNDQEMDAsLQQAgAkECajYC4AgMAQtBACADQQJqNgLgCBAmGkEAKALgCCICIAIQKhoLECYhAgwBCyABDgwEAAEGAAUAAAAAAAIEC0EAKALgCCEDAkAgAkHmAEcNACADLwEGQe0ARw0AIAMvAQRB7wBHDQAgAy8BAkHyAEcNAEEAIANBCGo2AuAIIAAQJhAnDwtBACADQX5qNgLgCAwCCwJAIAMvAQhB8wBHDQAgAy8BBkHzAEcNACADLwEEQeEARw0AIAMvAQJB7ABHDQAgAy8BChAeRQ0AQQAgA0EKajYC4AgQJiECQQAoAuAIIQMgAhApGiADQQAoAuAIEAJBAEEAKALgCEF+ajYC4AgPC0EAIANBBGoiAzYC4AgLQQAgA0EEaiICNgLgCEEAQQA6AMQIA0BBACACQQJqNgLgCBAmIQJBACgC4AghAwJAAkAgAhApIgJBPUYNACACQfsARg0AIAJB2wBHDQELQQBBACgC4AhBfmo2AuAIDwtBACgC4AgiAiADRg0BIAMgAhACECYhA0EAKALgCCECIANBLEYNAAtBACACQX5qNgLgCA8LDwtBACADQQpqNgLgCBAmGkEAKALgCCEDC0EAIANBEGo2AuAIAkAQJiICQSpHDQBBAEEAKALgCEECajYC4AgQJiECC0EAKALgCCEDIAIQKRogA0EAKALgCBACQQBBACgC4AhBfmo2AuAIDwsgAyADQQ5qEAIPCxAdC3UBAX8CQAJAIABBX2oiAUEFSw0AQQEgAXRBMXENAQsgAEFGakH//wNxQQZJDQAgAEFYakH//wNxQQdJIABBKUdxDQACQCAAQaV/aiIBQQNLDQAgAQ4EAQAAAQELIABB/QBHIABBhX9qQf//A3FBBElxDwtBAQs9AQF/QQEhAQJAIABB9wBB6ABB6QBB7ABB5QAQHw0AIABB5gBB7wBB8gAQIA0AIABB6QBB5gAQISEBCyABC60BAQN/QQEhAQJAAkACQAJAAkACQAJAIAAvAQAiAkFFaiIDQQNNDQAgAkGbf2oiA0EDTQ0BIAJBKUYNAyACQfkARw0CIABBfmpB5gBB6QBB7gBB4QBB7ABB7AAQIg8LIAMOBAIBAQUCCyADDgQCAAADAgtBACEBCyABDwsgAEF+akHlAEHsAEHzABAgDwsgAEF+akHjAEHhAEH0AEHjABAjDwsgAEF+ai8BAEE9RgvtAwECf0EAIQECQCAALwEAQZx/aiICQRNLDQACQAJAAkACQAJAAkACQAJAIAIOFAABAggICAgICAgDBAgIBQgGCAgHAAsgAEF+ai8BAEGXf2oiAkEDSw0HAkACQCACDgQACQkBAAsgAEF8akH2AEHvABAhDwsgAEF8akH5AEHpAEHlABAgDwsgAEF+ai8BAEGNf2oiAkEBSw0GAkACQCACDgIAAQALAkAgAEF8ai8BACICQeEARg0AIAJB7ABHDQggAEF6akHlABAkDwsgAEF6akHjABAkDwsgAEF8akHkAEHlAEHsAEHlABAjDwsgAEF+ai8BAEHvAEcNBSAAQXxqLwEAQeUARw0FAkAgAEF6ai8BACICQfAARg0AIAJB4wBHDQYgAEF4akHpAEHuAEHzAEH0AEHhAEHuABAiDwsgAEF4akH0AEH5ABAhDwtBASEBIABBfmoiAEHpABAkDQQgAEHyAEHlAEH0AEH1AEHyABAfDwsgAEF+akHkABAkDwsgAEF+akHkAEHlAEHiAEH1AEHnAEHnAEHlABAlDwsgAEF+akHhAEH3AEHhAEHpABAjDwsCQCAAQX5qLwEAIgJB7wBGDQAgAkHlAEcNASAAQXxqQe4AECQPCyAAQXxqQfQAQegAQfIAECAhAQsgAQuDAQEDfwNAQQBBACgC4AgiAEECaiIBNgLgCAJAAkACQCAAQQAoAuQITw0AIAEvAQAiAUGlf2oiAkEBTQ0CAkAgAUF2aiIAQQNNDQAgAUEvRw0EDAILIAAOBAADAwAACxAdCw8LAkACQCACDgIBAAELQQAgAEEEajYC4AgMAQsQKxoMAAsLkQEBBH9BACgC4AghAEEAKALkCCEBAkADQCAAIgJBAmohACACIAFPDQECQCAALwEAIgNB3ABGDQACQCADQXZqIgJBA00NACADQSJHDQJBACAANgLgCA8LIAIOBAIBAQICCyACQQRqIQAgAi8BBEENRw0AIAJBBmogACACLwEGQQpGGyEADAALC0EAIAA2AuAIEB0LkQEBBH9BACgC4AghAEEAKALkCCEBAkADQCAAIgJBAmohACACIAFPDQECQCAALwEAIgNB3ABGDQACQCADQXZqIgJBA00NACADQSdHDQJBACAANgLgCA8LIAIOBAIBAQICCyACQQRqIQAgAi8BBEENRw0AIAJBBmogACACLwEGQQpGGyEADAALC0EAIAA2AuAIEB0LyQEBBX9BACgC4AghAEEAKALkCCEBA0AgACICQQJqIQACQAJAIAIgAU8NACAALwEAIgNBpH9qIgRBBE0NASADQSRHDQIgAi8BBEH7AEcNAkEAQQAvAcYIIgBBAWo7AcYIQQAoAtQIIABBAXRqQQAvAcoIOwEAQQAgAkEEajYC4AhBAEEALwHICEEBaiIAOwHKCEEAIAA7AcgIDwtBACAANgLgCBAdDwsCQAJAIAQOBQECAgIAAQtBACAANgLgCA8LIAJBBGohAAwACws1AQF/QQBBAToAsAhBACgC4AghAEEAQQAoAuQIQQJqNgLgCEEAIABBACgCkAhrQQF1NgLACAs0AQF/QQEhAQJAIABBd2pB//8DcUEFSQ0AIABBgAFyQaABRg0AIABBLkcgABAocSEBCyABC0kBA39BACEGAkAgAEF4aiIHQQAoApAIIghJDQAgByABIAIgAyAEIAUQEkUNAAJAIAcgCEcNAEEBDwsgAEF2ai8BABAeIQYLIAYLWQEDf0EAIQQCQCAAQXxqIgVBACgCkAgiBkkNACAALwEAIANHDQAgAEF+ai8BACACRw0AIAUvAQAgAUcNAAJAIAUgBkcNAEEBDwsgAEF6ai8BABAeIQQLIAQLTAEDf0EAIQMCQCAAQX5qIgRBACgCkAgiBUkNACAALwEAIAJHDQAgBC8BACABRw0AAkAgBCAFRw0AQQEPCyAAQXxqLwEAEB4hAwsgAwtLAQN/QQAhBwJAIABBdmoiCEEAKAKQCCIJSQ0AIAggASACIAMgBCAFIAYQLEUNAAJAIAggCUcNAEEBDwsgAEF0ai8BABAeIQcLIAcLZgEDf0EAIQUCQCAAQXpqIgZBACgCkAgiB0kNACAALwEAIARHDQAgAEF+ai8BACADRw0AIABBfGovAQAgAkcNACAGLwEAIAFHDQACQCAGIAdHDQBBAQ8LIABBeGovAQAQHiEFCyAFCz0BAn9BACECAkBBACgCkAgiAyAASw0AIAAvAQAgAUcNAAJAIAMgAEcNAEEBDwsgAEF+ai8BABAeIQILIAILTQEDf0EAIQgCQCAAQXRqIglBACgCkAgiCkkNACAJIAEgAiADIAQgBSAGIAcQLUUNAAJAIAkgCkcNAEEBDwsgAEFyai8BABAeIQgLIAgLdgEDf0EAKALgCCEAAkADQAJAIAAvAQAiAUF3akEFSQ0AIAFBIEYNACABQaABRg0AIAFBL0cNAgJAIAAvAQIiAEEqRg0AIABBL0cNAxAPDAELEBALQQBBACgC4AgiAkECaiIANgLgCCACQQAoAuQISQ0ACwsgAQtYAAJAAkAgAUEiRg0AIAFBJ0cNAUEAKALgCCEBEBsgACABQQJqQQAoAuAIQQAoAoQIEAEPC0EAKALgCCEBEBogACABQQJqQQAoAuAIQQAoAoQIEAEPCxAdC2gBAn9BASEBAkACQCAAQV9qIgJBBUsNAEEBIAJ0QTFxDQELIABB+P8DcUEoRg0AIABBRmpB//8DcUEGSQ0AAkAgAEGlf2oiAkEDSw0AIAJBAUcNAQsgAEGFf2pB//8DcUEESSEBCyABC20BAn8CQAJAA0ACQCAAQf//A3EiAUF3aiICQRdLDQBBASACdEGfgIAEcQ0CCyABQaABRg0BIAAhAiABECgNAkEAIQJBAEEAKALgCCIAQQJqNgLgCCAALwECIgANAAwCCwsgACECCyACQf//A3ELXAECfwJAQQAoAuAIIgIvAQAiA0HhAEcNAEEAIAJBBGo2AuAIECYhAkEAKALgCCEAIAIQKRpBACgC4AghARAmIQNBACgC4AghAgsCQCACIABGDQAgACABEAILIAMLiQEBBX9BACgC4AghAEEAKALkCCEBA38gAEECaiECAkACQCAAIAFPDQAgAi8BACIDQaR/aiIEQQFNDQEgAiEAIANBdmoiA0EDSw0CIAIhACADDgQAAgIAAAtBACACNgLgCBAdQQAPCwJAAkAgBA4CAQABC0EAIAI2AuAIQd0ADwsgAEEEaiEADAALC0kBAX9BACEHAkAgAC8BCiAGRw0AIAAvAQggBUcNACAALwEGIARHDQAgAC8BBCADRw0AIAAvAQIgAkcNACAALwEAIAFGIQcLIAcLUwEBf0EAIQgCQCAALwEMIAdHDQAgAC8BCiAGRw0AIAAvAQggBUcNACAALwEGIARHDQAgAC8BBCADRw0AIAAvAQIgAkcNACAALwEAIAFGIQgLIAgLCx8CAEGACAsCAAAAQYQICxABAAAAAgAAAAAEAABwOAAA","function"==typeof atob?Uint8Array.from(atob(E),A=>A.charCodeAt(0)):Buffer.from(E,"base64"))).then(WebAssembly.instantiate).then(({exports:A})=>{B=A;});var E;

function totalist(dir, callback, pre='') {
	dir = path.resolve('.', dir);
	let arr = fs.readdirSync(dir);
	let i=0, abs, stats;
	for (; i < arr.length; i++) {
		abs = path.join(dir, arr[i]);
		stats = fs.statSync(abs);
		stats.isDirectory()
			? totalist(abs, callback, path.join(pre, arr[i]))
			: callback(path.join(pre, arr[i]), abs, stats);
	}
}

var chokidar = require('chokidar');

function isHidden(p, ignore, only){
  // Ignore only if ignore is set and ignore test passes
  let shouldIgnore = ignore && ignore.test(p);
  // if only isn't set, include everything. Otherwise, must pass only test
  let shouldInclude = !only || only.test(p);
  // file is hidden if it shouldn't be included OR it should be ignored
  return !shouldInclude || shouldIgnore
}

async function file_info(p, sources){
  await init;
  let js = (path__default.extname(p) === '.js');
  let contents = await fs.promises.readFile(p);
  let id;
  sources.find(s => {
    id = p.startsWith(s) ? p.replace(s,"") : p;
    // it found the correct source when id != p
    return id !== p;
  });
  let [imports, exports] = js ? parse(contents.toString('utf8')) : [null,null];
  return { imports, exports, contents, js, id }
}

class Jeye{
  constructor(source, options={}){
    Object.assign(this, {
      sources: (Array.isArray(source) ? source : [source]).map(path__default.normalize),
      options,
      targets: {},
      dependents: {},
      subscribers: {}
    });
    this.watcher = chokidar.watch(this.sources, {
      ...options.chokidar,
      ignoreInitial: true
    }).on('add', async (p) => {
      await this.updateDependents(p);
      let changed = await this.effects(p);
      this.dispatch('aggregate', this.targets, changed);
    }).on('change', async (p) => {
      await this.updateDependents(p);
      let changed = await this.effects(p);
      this.dispatch('aggregate', this.targets, changed);
    }).on('unlink', async (p) => {
      Object.keys(this.dependents).forEach(k => {
        this.dependents[k].delete(p);
        if(this.dependents[k].size === 0){
          delete this.dependents[k];
        }
      });
      delete this.dependents[p];
      this.dispatch('remove', p);
    }).on('unlinkDir', async (p) => {
      Object.keys(this.dependents).forEach(k => {
        this.dependents[k].forEach(dep => {
          if(dep.startsWith(p)){
            this.dependents[k].delete(dep);
          }
        });
        if(this.dependents[k].size === 0){
          delete this.dependents[k];
        }
      });
      this.dispatch('remove', p);
    });

    this.init().then(() => {
      this.dispatch('ready', this.targets);
    }).catch(e => {
      this.dispatch('error', "Error initializing jeye");
    });
    this.updateDependents = this.updateDependents.bind(this);
    this.effects = this.effects.bind(this);
  }

  isTarget(p){
    return this.sources.some(s => p.includes(s)) && !isHidden(p, this.options.ignore, this.options.only)
  }

  async init(){
    await init;
    this.targets = await targets(this.sources, this.options);
    await Promise.all(Object.keys(this.targets).map(this.updateDependents));
  }


  async effects(p){
    let changes = [];
    // if in source directory and isn't hidden
    if(this.isTarget(p)){
      // fire 'change' event and wait for completion
      await this.dispatch('change', p, this.targets[p]);
      // increment changes (1 target changed so far)
      changes.push(p);
    }
    if(this.dependents[p]){
      let effect = async function(dep){
        let nested_changes = await this.effects(dep);
        changes = changes.concat(nested_changes);
      }.bind(this);
      let promises = [];
      this.dependents[p].forEach(dep => {
        promises.push(effect(dep));
      });
      await Promise.all(promises);
    }
    return changes;
  }

  async updateDependents(p){
    let info = await file_info(p, this.sources);
    if(this.isTarget(p)){
      this.targets[p] = info;
      this.watcher.add(p);
    }
    let updateDependents = this.updateDependents;
    if(info.js){
      let promises = info.imports.map(async function({ s, e }){
        let import_str = info.contents.toString('utf8').substring(s,e);
        // only look for local imports (like './file.js' or '../file.js', not 'external-module')
        if(import_str.startsWith('.')){
          // ensure .js extension if not included in import statement
          import_str = import_str.endsWith('.js') ? import_str : import_str + '.js';
          // convert the import path to be relative to the cwd
          let import_path = path__default.join(p, '../', import_str);
          
          // if we haven't already tracked this file
          if(!this.dependents[import_path]){
            this.dependents[import_path] = new Set([p]);
            // recursively search for dependencies to trigger file changes
            await this.updateDependents(import_path);
            // watch dependency for file changes
            this.watcher.add(import_path);
          }
          else {
            // ensure this path is included in dependency's dependents
            this.dependents[import_path].add(p);
          }
        }
      }.bind(this));
    }
  }

  async dispatch(event, ...args){
    if(this.subscribers[event]){
      let promises = [];
      this.subscribers[event].forEach(callback => {
        // if callback is async, it will return a promise
        promises.push(callback.apply(null,args));
      });
      await Promise.all(promises);
    }
    
  }

  on(event, callback){
    if(this.subscribers[event]){
      this.subscribers[event].add(callback);
    } else {
      this.subscribers[event] = new Set([callback]);
    }
    return this;
  }
  
}

function watch(source, options){
  return new Jeye(source, options);
}

async function targets(sources=[], options={}){
  let targets = {};
  let paths = [];

  sources.map(src => {
    totalist(src,  (rel) => {
      paths.push(path__default.join(src, rel));
    });
  });

  // for each path, await the file_info and fill targets
  await Promise.all(paths.map(async p => {
    if(!isHidden(p, options.ignore, options.only)){
      targets[p] = await file_info(p, sources);
    }
  }));
  
  return targets
}

exports.targets = targets;
exports.watch = watch;
