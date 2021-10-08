import "systemjs/dist/system";
import "systemjs/dist/extras/amd";
import "systemjs/dist/extras/named-exports";
import "systemjs/dist/extras/named-register";
import "systemjs/dist/extras/transform";

declare const System: any;

export default async ({ apps }) => {
    const path = location.pathname;
    const name = path.replace("/", "");
    const index = `/static/${name}/${apps[name].version}/index.js`;
    const { default: component, mount } = await System.import(index);
    mount(component.default);
};
