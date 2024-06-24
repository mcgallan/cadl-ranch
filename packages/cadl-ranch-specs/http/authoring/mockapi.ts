import { passOnSuccess, mockapi, json, ValidationError } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { mock } from "node:test";

export const Scenarios: Record<string, ScenarioMockApi> = {};
const project = {
  projectName: "test1",
  projectKind: "CustomSingleLabelClassification",
  storageInputContainerName: "Container1",
  language: "en",
  createDateTime: "2022-08-26T18:38:00Z",
  lastModifiedDateTime: "2022-08-27T18:38:00Z",
  lastTrainedDateTime: "2022-08-28T18:38:00Z",
  lastDeployedDateTime: "2022-08-29T18:38:00Z",
};

const project2 = {
  projectName: "test2",
  projectKind: "CustomEntityRecognition",
  storageInputContainerName: "Container2",
  language: "es",
  createDateTime: "2022-08-26T18:38:00Z",
  lastModifiedDateTime: "2022-08-27T18:38:00Z",
  lastTrainedDateTime: "2022-08-28T18:38:00Z",
  lastDeployedDateTime: "2022-08-29T18:38:00Z",
};

const deployment = {
  name: "deploymenttest1",
};

const deployment2 = {
  name: "deploymenttest1",
};

const deploymentjob = {
  jobId: "job1",
  status: "Succeeded",
};

const swapDeploymentsJob = {
  jobId: "job1",
  status: "failed",
};
Scenarios.Authoring_Projects_CreateOrUpdate = passOnSuccess(
  mockapi.put("/language/authoring/analyze-text/projects/:projectname", (req) => {
    if (req.params.projectname !== "test1") {
      throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
    }
    req.expect.containsHeader("content-type", "application/json");
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    const validBody = {
      projectName: "test1",
      projectKind: "CustomSingleLabelClassification",
      storageInputContainerName: "Container1",
      language: "en",
    };
    req.expect.bodyEquals(validBody);
    return { status: 200, body: json(project) };
  }),
);

Scenarios.Authoring_Projects_Get = passOnSuccess(
  mockapi.get("/language/authoring/analyze-text/projects/:projectname", (req) => {
    if (req.params.projectname !== "test1") {
      throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
    }
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    return { status: 200, body: json(project) };
  }),
);

Scenarios.Authoring_Projects_Delete = passOnSuccess(
  mockapi.delete("/language/authoring/analyze-text/projects/:projectname", (req) => {
    if (req.params.projectname !== "test1") {
      throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
    }
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    return { status: 204 };
  }),
);

Scenarios.Authoring_Projects_List = passOnSuccess(
  mockapi.get("/language/authoring/analyze-text/projects", (req) => {
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    const responseBody = { list: [project, project2] };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Authoring_Projects_Export = passOnSuccess(
  mockapi.post("/language/authoring/analyze-text/projects/:projectname[:]export/:projectFileVersion", (req) => {
    if (req.params.projectname !== "test1") {
      throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
    }
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    req.expect.containsQueryParam("projectFileVersion", "2023-06-01");
    return { status: 200, body: json(project) };
  }),
);

Scenarios.Authoring_Projects_ImportX = passOnSuccess(
  mockapi.post("/language/authoring/analyze-text/projects/:projectname[:]importx", (req) => {
    if (req.params.projectname !== "test1") {
      throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
    }
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    return { status: 200 };
  }),
);

Scenarios.Authoring_Projects_Train = passOnSuccess(
  mockapi.post("/language/authoring/analyze-text/projects/:projectname[:]train", (req) => {
    if (req.params.projectname !== "test1") {
      throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
    }
    req.expect.containsHeader("content-type", "application/json");
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    const validBody = {
      projectName: "test1",
      projectKind: "CustomSingleLabelClassification",
      storageInputContainerName: "Container1",
      language: "en",
    };
    req.expect.bodyEquals(validBody);
    return { status: 200, body: json(project) };
  }),
);

Scenarios.Authoring_Deployments_getDeployment = passOnSuccess(
  mockapi.get("/language/authoring/analyze-text/projects/:projectname/deployments/:deploymentname", (req) => {
    if (req.params.projectname !== "test1") {
      throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
    }
    if (req.params.deploymentname !== "deploymenttest1") {
      throw new ValidationError(
        "Expected path param deploymentname= 'deploymenttest1'",
        "deploymenttest1",
        req.params.deploymentname,
      );
    }
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    return { status: 200, body: json(deployment) };
  }),
);

Scenarios.Authoring_Deployments_list = passOnSuccess(
  mockapi.get("/language/authoring/analyze-text/projects/:projectname/deployments", (req) => {
    if (req.params.projectname !== "test1") {
      throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
    }
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    const responseBody = { list: [deployment, deployment2] };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.Authoring_Deployments_deleteDeployment = passOnSuccess(
  mockapi.delete("/language/authoring/analyze-text/projects/:projectname/deployments/:deploymentname", (req) => {
    if (req.params.projectname !== "test1") {
      throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
    }
    if (req.params.deploymentname !== "deploymenttest1") {
      throw new ValidationError(
        "Expected path param deploymentname= 'deploymenttest1'",
        "deploymenttest1",
        req.params.deploymentname,
      );
    }
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    return { status: 204 };
  }),
);

Scenarios.Authoring_Deployments_deployProject = passOnSuccess(
  mockapi.put("/language/authoring/analyze-text/projects/:projectname/deployments/:deploymentname", (req) => {
    if (req.params.projectname !== "test1") {
      throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
    }
    if (req.params.deploymentname !== "deploymenttest1") {
      throw new ValidationError(
        "Expected path param deploymentname= 'deploymenttest1'",
        "deploymenttest1",
        req.params.deploymentname,
      );
    }
    req.expect.containsHeader("content-type", "application/json");
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    const validBody = {
      name: "deploymenttest1",
    };
    req.expect.bodyEquals(validBody);
    return { status: 200, body: json(deployment) };
  }),
);

Scenarios.Authoring_Deployments_swapDeployments = passOnSuccess(
  mockapi.post("/language/authoring/analyze-text/projects/:projectname/deployments:swap", (req) => {
    if (req.params.projectname !== "test1") {
      throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
    }
    req.expect.containsHeader("content-type", "application/json");
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    const deploymentlist = {
      firstDeploymentName: "deploymenttest1",
      secondDeploymentName: "deploymenttest2",
    };
    req.expect.bodyEquals(deploymentlist);
    return { status: 202 };
  }),
);

Scenarios.Authoring_Jobs_getDeploymentStatus = passOnSuccess(
  mockapi.get(
    "/language/authoring/analyze-text/projects/:projectname/deployments/:deploymentname/jobs/:jobId",
    (req) => {
      if (req.params.projectname !== "test1") {
        throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
      }
      if (req.params.deploymentname !== "deploymenttest1") {
        throw new ValidationError(
          "Expected path param deploymentname= 'deploymenttest1'",
          "deploymenttest1",
          req.params.deploymentname,
        );
      }
      if (req.params.jobId !== "job1") {
        throw new ValidationError("Expected path param jobId= 'job1'", "job1", req.params.jobId);
      }
      req.expect.containsQueryParam("api-version", "2022-05-15-preview");
      return { status: 200, body: json(deploymentjob) };
    },
  ),
);
Scenarios.Authoring_Jobs_getSwapDeploymentsStatus = passOnSuccess(
  mockapi.get(
    "/language/authoring/analyze-text/projects/:projectname/deployments/:deploymentname/swap/jobs/:jobId",
    (req) => {
      if (req.params.projectname !== "test1") {
        throw new ValidationError("Expected path param projectname= 'test1'", "test1", req.params.projectname);
      }
      if (req.params.deploymentname !== "deploymenttest1") {
        throw new ValidationError(
          "Expected path param deploymentname= 'deploymenttest1'",
          "deploymenttest1",
          req.params.deploymentname,
        );
      }
      if (req.params.jobId !== "job1") {
        throw new ValidationError("Expected path param jobId= 'job1'", "job1", req.params.jobId);
      }
      req.expect.containsQueryParam("api-version", "2022-05-15-preview");
      return { status: 200, body: json(deploymentjob) };
    },
  ),
);

Scenarios.Authoring_Global_getSupportedLanguages = passOnSuccess(
  mockapi.get("/language/authoring/analyze-text/projects/global/languages", (req) => {
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    const validBody = { maxcount: 10, skip: 1, maxpagesize: 2 };
    req.expect.bodyEquals(validBody);
    const responseBody = {
      pagedSupportedlanguage: [
        { languageName: "UKEnglish", languageCode: "en" },
        { languageName: "Spanish", languageCode: "es" },
      ],
    };
    return { status: 200, body: json(responseBody) };
  }),
);

Scenarios.AUthoring_Global_ListTrainingConfigVersions = passOnSuccess(
  mockapi.get("/language/authoring/analyze-text/projects/global/trainingconfigversions", (req) => {
    req.expect.containsQueryParam("api-version", "2022-05-15-preview");
    const validBody = { maxcount: 10, skip: 1, maxpagesize: 2 };
    req.expect.bodyEquals(validBody);
    const responseBody = {
      pagedTrainingConfigVersion: [
        { trainingConfigVersionStr: "", modelExpirationDate: "en" },
        { trainingConfigVersionStr: "Spanish", modelExpirationDate: "es" },
      ],
    };
    return { status: 200, body: json(responseBody) };
  }),
);
