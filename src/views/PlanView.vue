<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import PlanMap from '@/components/plan/PlanMap.vue'
</script>

<template>
  <div>
    <AppBar></AppBar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="8"><PlanMap></PlanMap></v-col>
          <v-col cols="4">
            <v-card>
              <v-card-title> Flight Plan </v-card-title>
              <v-card-item>
                <div class="plan-menu-column">
                  <div class="plan-menu-row">
                    <v-btn variant="tonal"><v-icon>mdi-file</v-icon></v-btn>
                  </div>
                  <div class="plan-menu-row">
                    <v-autocomplete
                      label="Departure"
                      :items="['YBAF', 'YBBN', 'YAMB', 'YGYM', 'YKRY', 'YMAK']"
                      variant="solo-filled"
                      density="compact"
                      hide-details
                    ></v-autocomplete>
                  </div>
                  <div class="plan-menu-row">
                    <v-autocomplete
                      label="Arrival"
                      :items="['YBAF', 'YBBN', 'YAMB', 'YGYM', 'YKRY', 'YMAK']"
                      variant="solo-filled"
                      density="compact"
                      hide-details
                    ></v-autocomplete>
                  </div>
                  <div class="plan-menu-row">
                    <v-textarea
                      label="Route"
                      rows="3"
                      no-resize
                      variant="solo-filled"
                    ></v-textarea>
                  </div>
                  <div class="plan-menu-row">EST - 11:12</div>
                </div>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>
<style>
  .plan-menu-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .plan-menu-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
</style>
