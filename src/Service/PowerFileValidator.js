class PowerFileValidator{

    static PROJECT_OBJECT_TEMPLATE = {
        Project: {
          Tasks: {
            Task: []
          },
          Resources: {
            Resource: []
          },
          Assignments: {}
        }
      };

      static TASK_OBJECT_TEMPLATE = {
        UID: {
          _text: "",
        },
        Name:{
          _text: "",
        },
        Start: {
          _text: "",
        },
        Finish:{
          _text: "",
        },
        OutlineNumber:{
          _text: "",
        },
        OutlineLevel:{
          _text: "",
        },
        PercentComplete:{
          _text: "",
        }
      };

      static RESOURCE_OBJECT_TEMPLATE = {
        UID: {
          _text: ""
        },
        Name: {
          _text: ""
        }
      }

      static ASSIGNMENT_OBJECT_TEMPLATE = {
        TaskUID: {
          _text: ""
        },
        ResourceUID: {
          _text: ""
        },
        Work: {
          _text: ""
        }
      }
      
      static isMsProjectStructure (template, checkedObject) {
        let result = true;
        for (const key in template) {

          if (!template.hasOwnProperty(key) || !checkedObject.hasOwnProperty(key)){
            return false;
          }

          if (typeof template[key] === "object" && Object.keys(template[key]).length) {
            result = this.isMsProjectStructure(template[key], checkedObject[key]);
          }

          if(!result) break;

        }
        return result;
      }

      static isXmlFile(file) {
       
        if (file) throw new Error("No files provided!");
      
        return "text/xml" === file.type;
      }


}
export default PowerFileValidator;
