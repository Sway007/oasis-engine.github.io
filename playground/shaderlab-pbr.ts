/**
 * @title Shader Lab PBR Material
 * @category Material
 */
import {
  Camera,
  Logger,
  Vector3,
  WebGLEngine,
  PrimitiveMesh,
  Color,
  DirectLight,
  Shader,
  Material,
  MeshRenderer,
  Entity,
  ModelMesh,
  Script,
  PBRMaterial,
  Vector4,
  TextureCoordinate,
  Engine,
} from '@galacean/engine';
import { OrbitControl, GSLPBRMaterial } from '@galacean/engine-toolkit';
import { ShaderLab } from '@galacean/engine-shader-lab';

Logger.enable();

main();

async function main() {
  // Create engine
  const engine = await WebGLEngine.create({
    canvas: 'canvas',
    shaderLab: new ShaderLab(),
  });

  const originPbrMaterial = new PBRMaterial(engine);
  const pbrMaterial = new GSLPBRMaterial(engine);

  engine.canvas.resizeByClientSize();

  // Create root entity
  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();
  scene.ambientLight.diffuseSolidColor = new Color(0.6, 0.6, 0.6);

  // Create camera
  const cameraEntity = rootEntity.createChild('Camera');
  cameraEntity.transform.setPosition(0, 0, 20);
  const camera = cameraEntity.addComponent(Camera);
  // @ts-ignore
  cameraEntity.addComponent(OrbitControl);

  // Create direct light
  const lightEntity = rootEntity.createChild('DirectLight');
  const light = lightEntity.addComponent(DirectLight);
  light.intensity = 0.6;

  const distanceX = 2.5;
  const distanceY = 2.4;
  const position = new Vector3();

  for (let i = 0; i < 3; i++) {
    const posX = (i - 1) * distanceX;

    // Create cuboid
    position.set(posX, distanceY * 3, 0);
    generatePrimitiveEntity(
      rootEntity,
      'cuboid',
      position,
      pbrMaterial,
      PrimitiveMesh.createCuboid(engine)
    );

    // Create sphere
    position.set(posX, distanceY * 2, 0);
    generatePrimitiveEntity(
      rootEntity,
      'sphere',
      position,
      originPbrMaterial,
      PrimitiveMesh.createSphere(engine)
    );

    // Create plane
    position.set(posX, distanceY * 1, 0);
    generatePrimitiveEntity(
      rootEntity,
      'plane',
      position,
      pbrMaterial,
      PrimitiveMesh.createPlane(engine)
    );

    // Create cylinder
    position.set(posX, -distanceY * 0, 0);
    generatePrimitiveEntity(
      rootEntity,
      'cylinder',
      position,
      originPbrMaterial,
      PrimitiveMesh.createCylinder(engine)
    );

    // Create cone
    position.set(posX, -distanceY * 1, 0);
    generatePrimitiveEntity(
      rootEntity,
      'cone',
      position,
      pbrMaterial,
      PrimitiveMesh.createCone(engine)
    );

    // Create turos
    position.set(posX, -distanceY * 2, 0);
    generatePrimitiveEntity(
      rootEntity,
      'torus',
      position,
      originPbrMaterial,
      PrimitiveMesh.createTorus(engine)
    );

    // // Create capsule
    position.set(posX, -distanceY * 3, 0);
    generatePrimitiveEntity(
      rootEntity,
      'capsule',
      position,
      pbrMaterial,
      PrimitiveMesh.createCapsule(engine, 0.5, 1, 24, 1)
    );
  }

  engine.run();
}

/**
 * generate primitive mesh entity.
 */
function generatePrimitiveEntity(
  rootEntity: Entity,
  name: string,
  position: Vector3,
  material: Material,
  mesh: ModelMesh
): Entity {
  const entity = rootEntity.createChild(name);
  entity.transform.setPosition(position.x, position.y, position.z);
  entity.addComponent(RotateScript);
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(material);

  return entity;
}

/**
 * Script for rotate.
 */
class RotateScript extends Script {
  /**
   * @override
   * The main loop, called frame by frame.
   * @param deltaTime - The deltaTime when the script update.
   */
  onUpdate(deltaTime: number): void {
    this.entity.transform.rotate(0.5, 0.6, 0);
  }
}
