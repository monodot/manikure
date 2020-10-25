// Consts
const OBJECT_TYPE_DEPLOYMENTCONFIG = 'DeploymentConfig';
const OBJECT_TYPE_STATEFULSET = 'StatefulSet';

// Variables

var form = document.querySelector('#app');
var yaml = document.querySelector('#yaml');

var objectType = document.querySelector('#dc-objecttype');

var appName = document.querySelector('#dc-metadata-labels-app');
var dcName = document.querySelector('#dc-metadata-name');
var replicas = document.querySelector('#dc-spec-replicas');
var containerName = document.querySelector('#dc-spec-container-name');

var groupVolumeClaimTemplates = document.querySelector('#group-sts-spec-volumeclaimtemplates');
var volClaimTemplateName = document.querySelector('#sts-spec-volumeclaimtemplates-metadata-name');
var volClaimTemplateAccessMode = document.querySelector('#sts-spec-volumeclaimtemplates-metadata-spec-accessmode');

var triggerConfigChange = document.querySelector('#dc-spec-triggers-configchange');
var triggerImageChange = document.querySelector('#dc-spec-triggers-imagechange');

var imageStreamName = document.querySelector('#imagestream-name');
var imageStreamNamespace = document.querySelector('#imagestream-namespace');

var defaultReadinessProbe = document.querySelector('#dc-spec-container-readinessprobe');
var defaultLivenessProbe = document.querySelector('#dc-spec-container-livenessprobe');

var envLiteralName = document.querySelector('#dc-spec-template-spec-container-env-literal-name');
var envLiteralValue = document.querySelector('#dc-spec-template-spec-container-env-literal-value');

var envKubernetesNamespace = document.querySelector('#dc-spec-template-container-env-k8sns');
var envRefName = document.querySelector('#dc-spec-template-spec-container-env-ref-name');
var envRefType = document.querySelector('#dc-spec-template-spec-container-env-ref-type');
var envRefRefName = document.querySelector('#dc-spec-template-spec-container-env-ref-refname');
var envRefRefKey = document.querySelector('#dc-spec-template-spec-container-env-ref-refkey');

var volPvcVolName = document.querySelector('#dc-spec-template-spec-volume-pvc-volname');
var volPvcClaimName = document.querySelector('#dc-spec-template-spec-volume-pvc-claimname');
var volPvcMountPath = document.querySelector('#dc-spec-template-spec-volume-pvc-mountpath');
var volCMVolName = document.querySelector('#dc-spec-template-spec-volume-cm-volname');
var volCMCMName = document.querySelector('#dc-spec-template-spec-volume-cm-cmname');
var volCMMountPath = document.querySelector('#dc-spec-template-spec-volume-cm-mountpath');

var submitHandler = function(event) {
  event.preventDefault();

  var dcObj = {
    'apiVersion': 'v1',
    'kind': 'DeploymentConfig',
    'metadata': {
      'labels': {
        'app': appName.value
      },
      'name': dcName.value
    },
    'spec': {
      // 'selector': {
      //   'deploymentconfig': dcName.value
      // },
      'replicas': replicas.value,
      'template': {
        'metadata': {
          'labels': {
            'deploymentconfig': dcName.value
          }
        },
        'spec': {
          'containers': [
            {
              'name': containerName.value,
              'ports': [
                {
                  'containerPort': 8080,
                  'protocol': 'TCP',
                  'name': 'myport'
                }
              ],
              'env': [ ],
              'resources': {
                'requests': {
                  'cpu': '0.2',
                  'memory': '256Mi'
                },
                'limits': {
                  'cpu': '1',
                  'memory': '1Gi'
                }
              },
              'volumeMounts': []
            }
          ],
          'volumes': []
        }
      },
      'triggers': []
    }
  }

  // Stuff specific to either a DeploymentConfig or a StatefulSet
  if (objectType.value == OBJECT_TYPE_DEPLOYMENTCONFIG) {
    dcObj.kind = 'DeploymentConfig';
  } else if (objectType.value == OBJECT_TYPE_STATEFULSET) {
    dcObj.kind = 'StatefulSet';
    dcObj.apiVersion = 'apps/v1beta1';

    if (volClaimTemplateName.value.length > 0) {
      dcObj.spec.volumeClaimTemplates = [];
      dcObj.spec.volumeClaimTemplates.push({ 
        'metadata': {
          'name': volClaimTemplateName.value
        },
        'spec': {
          'accessModes': [ volClaimTemplateAccessMode.value ]
        }
      });
      dcObj.spec.volumeClaimTemplates[0].metadata.name = volClaimTemplateName.value;
    }
  }

  if (defaultReadinessProbe.checked) {
    dcObj.spec.template.spec.containers[0].readinessProbe = {
      'httpGet': {
        'path': '/health',
        'port': 8080
      },
      'initialDelaySeconds': 10
    };
  }
  if (defaultLivenessProbe.checked) {
    dcObj.spec.template.spec.containers[0].livenessProbe = {
      'httpGet': {
        'path': '/health',
        'port': 8080
      },
      'initialDelaySeconds': 180
    };
  }

  if (triggerConfigChange.checked) {
    dcObj.spec.triggers.push({ 'type': 'ConfigChange' });
  }

  // Image Stream
  if (imageStreamName.value.length > 0) {
    imageStreamTrigger = { 
      'type': 'ImageChange',
      'imageChangeParams': {
        'containerNames': [
          containerName.value
        ],
        'from': {
          'kind': 'ImageStreamTag',
          'name': imageStreamName.value
        }
      }
    };

    if (triggerImageChange.checked) {
      imageStreamTrigger.imageChangeParams.automatic = true;
    }
    if (imageStreamNamespace.value.length > 0) {
      imageStreamTrigger.imageChangeParams.from.namespace = imageStreamNamespace.value;
    }

    dcObj.spec.triggers.push(imageStreamTrigger);
  }

  // Environment variables
  if (envKubernetesNamespace.checked) {
    dcObj.spec.template.spec.containers[0].env.push({
      'name': 'KUBERNETES_NAMESPACE',
      'valueFrom': {
        'fieldRef': {
          'fieldPath': 'metadata.namespace'
        }
      }
    });
  }



  if (envLiteralName.value.length > 0 && envLiteralValue.value.length > 0) {
    dcObj.spec.template.spec.containers[0].env.push({
      'name': envLiteralName.value,
      'value': envLiteralValue.value
    })
  };

  if (envRefName.value.length > 0 && envRefRefName.value.length > 0 
      && envRefRefKey.value.length > 0) {
    var refType;
    if (envRefType.value == 'secret') {
      refType = 'secretKeyRef';
    } else {
      refType = 'configMapKeyRef';
    }
    dcObj.spec.template.spec.containers[0].env.push({
      'name': envRefName.value,
      'valueFrom': {
        [refType]: {
          'name': envRefRefName.value,
          'key': envRefRefKey.value
        }
      }

    })
  }

  
  // Volume Claim Templates (for StatefulSets)


  // Volumes and Volume mounts
  if (volPvcVolName.value.length > 0 && volPvcClaimName.value.length > 0) {
    dcObj.spec.template.spec.volumes.push({
      'name': volPvcVolName.value,
      'persistentVolumeClaim': {
        'claimName': volPvcClaimName.value
      }
    });

    // Mount the PV at a location
    if (volPvcMountPath.value.length > 0) {
      dcObj.spec.template.spec.containers[0].volumeMounts.push({
        'mountPath': volPvcMountPath.value,
        'name': volPvcVolName.value
      });
    }
  }

  // ConfigMap mounts
  if (volCMVolName.value.length > 0 && volCMCMName.value.length > 0) {
    dcObj.spec.template.spec.volumes.push({
      'name': volCMVolName.value,
      'configMap': {
        'name': volCMCMName.value
      }
    });

    // Mount the ConfigMap at a nice location
    if (volCMMountPath.value.length > 0) {
      dcObj.spec.template.spec.containers[0].volumeMounts.push({
        'mountPath': volCMMountPath.value,
        'name': volCMVolName.value
      });
    }
  }

  yaml.value = jsyaml.dump(dcObj);
}

form.addEventListener('submit', submitHandler, false);

// ------------------------------
// Form mutation stuff (changing inputs based on some select values)
objectType.addEventListener('change', function() {
    alert('hello');
    mutateVolumeClaimTemplates();
});

// Mutatey functions .... 
// these show/hide things on the form based on a selected dropdown value

function mutateVolumeClaimTemplates() {
    if (objectType.value == OBJECT_TYPE_DEPLOYMENTCONFIG) {
        groupVolumeClaimTemplates.classList.add('is-hidden');
    } else if (objectType.value == OBJECT_TYPE_STATEFULSET) {
        groupVolumeClaimTemplates.classList.remove('is-hidden');
    }
}

function navbarBurgers() {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
}

// ------------------------------
// Enable navbar BURGER ahahahaha
document.addEventListener('DOMContentLoaded', () => {
  navbarBurgers();
  mutateVolumeClaimTemplates();
});    

// -----------------------
// End navbar BURGER setup
