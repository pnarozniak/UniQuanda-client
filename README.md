## JS / TS notation
| Category | Notation |
| ---------- | ------------- |
| class / interface / type / enum / decorator / type parameters | PascalCase |
| private / public / static fields | camelCase |
| let / const variables | camelCase |
| observable type variables / methods | camelCase$ |
| readonly fields | \_camelCase |
| enum values | PascalCase |
| Method name | camelCase |
| Method argument name | camelCase |

## Angular objects notations

| Category | Code Notation | File Notation
| -------- | ------------- | ------------ |
| component | PascalCase + Component | kebab-case.component.spec\|ts\|html\|scss
| service | PascalCase + Service | kebab-case.service.ts
| model | PascalCase | kebab-case.model.ts
| module | PascalCase + Module | kebab-case.module.ts
| pipe | PascalCase + Pipe | kebab-case.pipe.ts
| directive | PascalCase + Directive | kebab-case.directive.ts

## Angular coding standards
- Methods handling dom events
    > Add 'handle' prefix
    ```
    handleClick(event: Event): void {}
    ```  
- Methods passed to child components
    > Add 'Callback' postfix
    ```
    @Input() loginCallback = (args: any): void
    ```  
- Code documentations:
    ```js
    /**
    * description
    * @param name description
    * @returns description
    */
    ```
   Example:
    ```js
    /**
    * This is the foo function
    * @param bar This is the bar parameter
    * @returns returns a string version of bar
    */
    function foo(bar: number): string {
        return bar.toString()
    }
    ```

## Angular folder structure

#### Top level structure
    ├── app 
        ├── core 
            └── core.module.ts
        ├── shared 
            └── shared.module.ts
        ├── feature
        └── app.module.ts
    └── README.md

##### Core module
The core module is designed for your singleton services shared throughout the application.
We want to keep our singleton services in the core module so only one instance is ever created.
Another piece of our application that should live in the Core Modules are app-level components.
In general core module contains: root-scoped services, static components like the navbar and footer, interceptors, guard, constants, enums, utils, and universal models. 


##### Shared module
The Shared Module is designed for everything that is shared throughout the application. In general shared module contains: components, directives, pipes and more. 
The Shared module can be imported into many feature models.
It is also common to import and export Angular built modules (material, common...) inside your Shared Module if you need to access them in multiple locations.

##### Feature module
A feature module delivers a cohesive set of functionality focused on a specific application need. Feature modules helps to partition the application into focused areas. 
A feature module collaborates with the root module, shared module and with other modules through the services it provides and the components, directives, and pipes that it shares.

Example feature module:

    ├── feature
        └── auth
            ├── pages
                ├── login
                    ├── login-form
                        └──  login-form.component.spec|ts|html|scss
                    ├──  login.model.ts
                    └── login.component.spec|ts|html|scss
                ├── register
                    ├── register-form
                        └──  register-form.component.spec|ts|html|scss
                    ├── register.model.ts
                    └── register.component.spec|ts|html|scss
            ├── components
                ├── auth-box
                ├── auth-form
            ├── auth-guard.service.ts
            ├── auth-tokens.service.ts
            ├── auth-api.service.ts
            └── auth-routing.module.ts
            └── auth.module.ts