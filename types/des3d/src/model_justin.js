module.exports = {
  order: ['sim', 'mesh', 'markers', 'control', 'bc', 'ic', 'mat'],
  views: {
   sim: {
    attributes: [modelname, max_steps, max_time_in_yr, 
      output_step_interval, output_time_interval_in_yr, 
      checkpoint_frame_interval, is_restarting, restarting_from_modelname, restarting_from_frame,
      has_initial_checkpoint, has_marker_output, has_output_during_remeshing, is_outputting_averaged_fields],
   } ,
   mesh: {
    attributes: [meshing_option, meshing_verbosity, tetgen_optlevel,
    xlength, ylength, zlength, resolution, smallest_size, largest_size,
    min_angle, min_tet_angle, max_ratio,
    for_meshing_option, refined_zonex, refined_zoney, refined_zonez,
    meshing_option, poly_filename, 
    quality_check_step_interval, min_quality, max_boundary_distortion,
    remeshing_option, is_discarding_internal_segements,
    mmg_debug, mmg_verbose, mmg_hmax_factor, mmg_hmin_factor, mmg_hausd_factor],
   } ,
   markers: {
    attributes: [init_marker_option, markers_per_element, init_marker_spacing, 
    min_num_markers_in_element, replenishment_option, random_seed],
   } ,
   control: {
    attributes: [gravity, characteristic_speed, is_quasi_static, dt_fraction, fixed_dt, inertial_scaling, 
    damping_option, damping_factor, ref_pressure_option, surface_process_option, surface_diffusivity, 
    has_thermal_diffusion, has_hydration_process, hydration_migration_speed],
   } ,
   bc: {
    attributes: [vbc_x0, vbc_x1, vbc_val_x0, vbc_val_x1, vbc_y0, vbc_y1, vbc_val_y0, vbc_val_y1,
    vbc_val_z0, vbc_val_z1, vbc_n0, vbc_val_n0, vbc_n1, vbc_val_n1, vbc_n2, vbc_val_n2, vbc_n3, vbc_val_n3,
    has_wrinkler_foundation, wrinkler_delta_rho, has_elastic_foundation, elastic_foundation_constant, 
    has_water_loading, surface_temperature, mantle_temperature],
   } ,
   ic: {
    attributes: [mattype_option, mattype_layer_depths, weakzone_option, weakzone_plstrain, weakzone_azimuth,
    weakzone_inclination, weakzone_halfwidth, weakzone_y_min, weakzone_y_max, weakzone_depth_min, weakzone_depth_max,
    weakzone_xcenter, weakzone_ycenter, weakzone_zcenter, weakzone_xsemi_axis, weakzone_ysemi_axis, weakzone_zsemi_axis,
    temperature_option, oceanic_plate_age_in_yr, temperature_option, temp_filename, nodes_filename, connectivity_filename,
    isostasy_adjustment_time_in_yr],
   } ,
   mat: {
    attributes: [rheology_type, is_plane_strain, phase_change_option, num_materials, rho0, alpha, bulk_modulus, 
    shear_modulus, visc_exponent, visc_coefficient, visc_activation_energy, heat_capacity, therm_cond, pls0, pls1,
    cohesion0, cohesion1, friction_angle0, friction_angle1, dilation_angle0, dilation_angle1,
    max_viscosity, min_viscosity, max_tension, max_thermal_diffusivity],
   },
  },
  definitions: {
    modelname: {
      parameters: [
        {
          id: 'modelname',
          label: 'Model Name',
          type: 'string',
          size: 1,
          default: 'result',
        },
      ],
    },
    max_steps: {
      parameters: [
        {
          id: 'max_steps',
          label: 'Max Steps',
          type: 'int',
          size: 1,
          default: 1000,
        },
      ],
    },
    max_time_in_yr: {
      parameters: [
        {
          id: 'max_time_in_yr',
          label: 'Max Time In Year',
          type: 'int',
          size: 1,
          default: 3000,
        },
      ],
    },
    output_step_interval: {
      parameters: [
        {
          id: 'output_step_interval',
          label: 'Output Step Interval',
          type: 'int',
          size: 1,
          default: 200,
        },
      ],
    },
    output_time_interval_in_yr: {
      parameters: [
        {
          id: 'output_time_interval_in_yr',
          label: 'Output Time Interval In Year',
          type: 'int',
          size: 1,
          default: 100,
        },
      ],
    },
    checkpoint_frame_interval: {
      parameters: [
        {
          id: 'checkpoint_frame_interval',
          label: 'Output Time Interval In Year',
          type: 'int',
          size: 1,
          default: 10,
        },
      ],
    },
    is_restarting: {
      parameters: [
        {
          id: 'is_restarting',
          label: 'What does is restarting mean',
          type: 'boolean',
          size: 1,
          default: false,
        },
      ],
    },
    restarting_from_modelname: {
      parameters: [
        {
          id: 'restarting_from_modelname',
          label: 'unsure what this means',
          type: 'string',
          size: 1,
          default: 'result',
        },
      ],
    },
    restarting_from_frame: {
      parameters: [
        {
          id: 'restarting_from_frame',
          label: 'unsure whether this is boolean or not',
          type: 'boolean',
          size: 1,
          default: false,
        },
      ],
    },
  },


// #############################################################################
// # This is an input file for 2D/3D DynEarthSol. All available input parameters
// # are listed here. Parameters with default values are commented out with
// # the default values. Parameters that are not commented out are required.
// #
// # Parameters starting with 'is_' or 'has_' are boolean. Acceptable values
// # include: yes, no, on, off, 1, 0.
// #
// # Parameters of multiple values must be quoted by [].
// #
// # Use command lne argument '--help' to see more description.
// #############################################################################
//                                                          [sim]
// modelname = result
// max_steps = 1000
// max_time_in_yr = 3000
// output_step_interval = 200
// output_time_interval_in_yr = 100
// #checkpoint_frame_interval = 10
// #is_restarting = no
// #restarting_from_modelname = result
// #restarting_from_frame = 0
// #has_initial_checkpoint = yes
// #has_marker_output = yes
// #has_output_during_remeshing = no
// #is_outputting_averaged_fields = yes
//                                                                   [mesh]
// #meshing_option = 1
// #meshing_verbosity = -1
// #tetgen_optlevel = 3
// xlength = 130e3
// ylength = 100e3
// zlength = 100e3
// resolution = 30e3
// #smallest_size = 0.01
// #largest_size = 30
// #min_angle = 32.
// #min_tet_angle = 22.
// #max_ratio = 2.0
// ### For meshing_option = 2
// #refined_zonex = [0.4, 0.6]
// #refined_zoney = [0.4, 0.6]
// #refined_zonez = [0.8, 1.0]
// ### For meshing_option = 90
// #poly_filename = mesh.poly
// ### For meshing_option = 95
// #poly_filename = mesh.poly
// #quality_check_step_interval = 100
// #min_quality = 0.4
// #max_boundary_distortion = 0.25
// #remeshing_option = 0
// #is_discarding_internal_segments = yes
// #mmg_debug = 0
// #mmg_verbose = 0
// #mmg_hmax_factor = 2.0
// #mmg_hmin_factor = 0.2
// #mmg_hausd_factor = 0.01
//                                                [markers]
// #init_marker_option = 1
// #markers_per_element = 4
// #init_marker_spacing = 0.3
// #min_num_markers_in_element = 3
// #replenishment_option = 1
// #random_seed = 1
//                                            [control]
// #gravity = 10
// #characteristic_speed = 0
// #is_quasi_static = yes
// #dt_fraction = 1.0
// #fixed_dt = 0.0
// #inertial_scaling = 1e5
// #damping_option = 1
// #damping_factor = 0.8
// #ref_pressure_option = 0
// #surface_process_option = 0
// #surface_diffusivity = 1e-6
// #has_thermal_diffusion = yes
// #has_hydration_processes = no
// #hydration_migration_speed = 3e-9
//                                          [bc]
// #vbc_x0 = 1
// #vbc_x1 = 1
// #vbc_val_x0 = -1e-9
// #vbc_val_x1 = 1e-9
// #vbc_y0 = 1
// #vbc_y1 = 1
// #vbc_val_y0 = 0
// #vbc_val_y1 = 0
// #vbc_z0 = 0
// #vbc_z1 = 0
// #vbc_val_z0 = 0
// #vbc_val_z1 = 0
// #vbc_n0 = 1
// #vbc_val_n0 = 0
// #vbc_n1 = 1
// #vbc_val_n1 = 0
// #vbc_n2 = 1
// #vbc_val_n2 = 0
// #vbc_n3 = 1
// #vbc_val_n3 = 0
// #has_winkler_foundation = yes
// #winkler_delta_rho = 0
// #has_elastic_foundation = no
// #elastic_foundation_constant = 1e11
// #has_water_loading = yes
// #surface_temperature = 273
// #mantle_temperature = 1600
//                                                          [ic]
// #mattype_option = 0
// #mattype_layer_depths = [0.5]
// #weakzone_option = 1
// #weakzone_plstrain = 0.1
// #weakzone_azimuth = 0
// #weakzone_inclination = 90
// #weakzone_halfwidth = 1.5
// #weakzone_y_min = 0
// #weakzone_y_max = 1
// #weakzone_depth_min = 0
// #weakzone_depth_max = 1
// #weakzone_xcenter = 0.5
// #weakzone_ycenter = 0.5
// #weakzone_zcenter = 0.5
// #weakzone_xsemi_axis = 1e3
// #weakzone_ysemi_axis = 1e3
// #weakzone_zsemi_axis = 1e3
// #temperature_option = 0
// #oceanic_plate_age_in_yr = 60e6
// For temperature_option = 90
// #Temp_filename = Thermal.dat
// #Nodes_filename = Coord.dat
// #Connectivity_filename = Connectivity.dat
// #isostasy_adjustment_time_in_yr = 0
//                                                                [mat]
// rheology_type = elastic # Possible values: elastic, viscous, maxwell,
//                         # elasto-plastic, or elasto-visco-plastic
// #is_plane_strain = no
// #phase_change_option = 0
// #num_materials = 1
// ### The following parameters can take either 'num_materials' values or 1
// ### value, which is treated as 'num_materials' identical values.
// #rho0 = [ 3210 ]
// #alpha = [ 3e-5 ]
// #bulk_modulus = [ 128.2e9 ]
// #shear_modulus = [ 80.5e9 ]
// #visc_exponent = [ 3.05 ]
// #visc_coefficient = [ 1.25e-1 ]
// #visc_activation_energy = [ 3.76e5 ]
// #heat_capacity = [ 1000 ]
// #therm_cond = [ 3 ]
// #pls0 = [ 0 ]
// #pls1 = [ 0.1 ]
// #cohesion0 = [ 4e7 ]
// #cohesion1 = [ 4e6 ]
// #friction_angle0 = [ 30 ]
// #friction_angle1 = [ 5 ]
// #dilation_angle0 = [ 0 ]
// #dilation_angle1 = [ 0 ]
// #max_viscosity = 1e24
// #min_viscosity = 1e18
// #max_tension = 1e9
// #max_thermal_diffusivity = 5e-6
};